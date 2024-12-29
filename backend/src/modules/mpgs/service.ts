import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/framework/types";
import { MedusaError } from "@medusajs/utils";
import {
  PaymentProviderError,
  PaymentProviderSessionResponse,
  PaymentSessionStatus,
  UpdatePaymentProviderSession,
  CreatePaymentProviderSession,
} from "@medusajs/framework/types";

import { BigNumber } from "@medusajs/framework/utils";
import {
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/framework/types";

type Options = {
  msoUrl: string;
  merchantId: string;
  apiPassword: string;
};

type InjectedDependencies = {
  logger: Logger;
};

class MPGSProviderService extends AbstractPaymentProvider<Options> {
  // https://ap-gateway.mastercard.com/api/documentation/apiDocumentation/rest-json/version/100/operation/Session%3a%20Create%20Session.html?locale=en_US
  static identifier = "mpgs";
  protected logger_: Logger;
  protected options_: Options;
  protected client;

  constructor(container: InjectedDependencies, options: Options) {
    super(container, options);

    this.logger_ = container.logger;
    this.options_ = options;
  }

  static validateOptions(options: Record<string, any>) {
    if (!options.merchantId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "MPGS Merchant Id is required in the provider's options."
      );
    }
    if (!options.apiPassword) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "MPGS Merchant Id is required in the provider's options."
      );
    }
    if (!options.msoUrl) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "MPGS MSO Url is required in the provider's options."
      );
    }
  }

  generateAuthToken = () => {
    return Buffer.from(
      "merchant." + this.options_.merchantId + ":" + this.options_.apiPassword
    ).toString("base64");
  };

  async initiatePayment(
    Context: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context } = Context;
    console.log("Context: ", Context);
    try {
      const authToken = this.generateAuthToken();
      const url =
        this.options_.msoUrl +
        `/api/rest/version/100/merchant/${this.options_.merchantId}/session`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Session Data: ", data);
        if (data.result === "SUCCESS") {
          const paymentUrl = url + `/${data.session.id}`;
          const payerData = {
            sourceOfFunds: {
              provided: {
                card: {
                  // @ts-ignore
                  nameOnCard: context.name_on_card,
                  // @ts-ignore
                  number: context.card_number,
                  expiry: {
                    // @ts-ignore
                    month: context.expiry_date.substring(0, 2),
                    // @ts-ignore
                    year: context.expiry_date.substring(2, 4),
                  },
                  // @ts-ignore
                  securityCode: context.security_card,
                },
              },
            },
          };
          const paymentResponse = await fetch(paymentUrl, {
            method: "PUT",
            body: JSON.stringify(payerData),
            headers: {
              Authorization: `Basic ${authToken}`,
              "Content-Type": "application/json",
            },
          });
          if (paymentResponse.ok) {
            const paymentData = await paymentResponse.json();
            console.log("Payment Data: ", paymentData);
            const threeDSecure = await this.threeDSecureInitiate(
              // @ts-ignore
              context.cart_id,
              paymentData.session.id,
              Number(amount),
              currency_code
            );
            if (threeDSecure) {
              return { data: threeDSecure.data };
            }
            return {
              data: {
                payment_id: paymentData.session.id,
                amount: amount,
                currency_code: currency_code,
              },
            };
          }

          return {
            data: { session_id: data.session.id },
          };
        }
      }
      return {
        error: `Payment initiation failed + ${response.status}`,
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async threeDSecureInitiate(
    cart_id: string,
    session_id: string,
    amount: number,
    country_code: string
  ) {
    console.log("Initiate 3DS", cart_id, session_id, amount, country_code);
    const authToken = this.generateAuthToken();
    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/order/OrdID_${cart_id}/transaction/TxnID_${cart_id}`;

    const payload = {
      apiOperation: "INITIATE_AUTHENTICATION",
      correlationId: cart_id,
      order: {
        currency: "USD",
      },
      session: {
        id: session_id,
      },
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Initiate 3ds resonse: ", response);

    if (response.ok) {
      const data = await response.json();
      console.log("Initiate 3DS Data: ", data);
      const threeDSresponse = data.response;
      if (
        threeDSresponse &&
        threeDSresponse.gatewayRecommendation === "PROCEED"
      ) {
        // go directly to payment
        return { data: { threeDS: false } };
      } else {
        // redirect to 3DS page
        return await this.threeDSecureAuthenticate(
          cart_id,
          session_id,
          amount,
          country_code
        );
      }
    }
  }

  async threeDSecureAuthenticate(
    cart_id: string,
    session_id: string,
    amount: number,
    country_region: string
  ) {
    const authToken = this.generateAuthToken();
    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/order/OrdID_${cart_id}/transaction/TxnID_${cart_id}`;

    const payload = {
      apiOperation: "AUTHENTICATE_PAYER",
      authentication: {
        redirectResponseUrl: "https://localhost:8000/us/checkout",
      },
      correlationId: cart_id,
      device: {
        browserDetails: {
          "3DSecureChallengeWindowSize": "600_X_400",
          acceptHeaders: "application/json",
          colorDepth: 24,
          javaEnabled: true,
          language: "en-US",
          screenHeight: 640,
          screenWidth: 480,
          timeZone: 273,
        },
      },
      order: {
        amount: amount,
        currency: "USD",
      },
      session: {
        id: session_id,
      },
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Authenticate 3DS Data: ", data);
      const authenticationHtml = data.authentication.redirectHtml;
      return {
        data: {
          threeDS: true,
          html: authenticationHtml,
        },
      };
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<
    | PaymentProviderError
    | {
        status: PaymentSessionStatus;
        data: PaymentProviderSessionResponse["data"];
      }
  > {
    console.log("Authorize Payment");
    console.log("PaymentSessionData: ", paymentSessionData);
    console.log("Context: ", context);
    try {
      const authToken = this.generateAuthToken();
      const url =
        this.options_.msoUrl +
        `/api/rest/version/100/merchant/${this.options_.merchantId}/order/${context.cart_id}/transaction/${context.cart_id}`;

      const payload = {
        apiOperation: "PAY",
        authentication: {
          transactionId: context.cart_id,
        },
        order: {
          amount: Number(paymentSessionData.amount),
          currency: String(paymentSessionData.currency_code).toUpperCase(),
          reference: context.cart_id,
        },
        transaction: {
          reference: context.cart_id,
        },
        session: {
          id: paymentSessionData.payment_id,
        },
        sourceOfFunds: {
          type: "CARD",
        },
      };

      // const response = await fetch(url, {
      //   method: "PUT",
      //   body: JSON.stringify(payload),
      //   headers: {
      //     Authorization: `Basic ${authToken}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log("Authorize Data: ", data);
      // }
      // console.log("Response", response);
      return {
        error: "Error",
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async updatePayment(
    context: UpdatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context: customerDetails, data } = context;
    const externalId = data.id;

    const authToken = this.generateAuthToken();
    // const url =
    //   this.options_.msoUrl +
    //   `/api/rest/version/100/merchant/${this.options_.merchantId}/session/${context.data.session_id}`;

    console.log("Data: ", data);
    console.log("context: ", context);

    try {
      // assuming you have a client that updates the payment
      // const response = await this.client.update(externalId, {
      //   amount,
      //   currency_code,
      //   customerDetails,
      // });

      return {
        // ...response,
        data: {
          id: "some id",
        },
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async capturePayment(
    paymentData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const externalId = paymentData.id;

    try {
      // assuming you have a client that captures the payment
      const newData = await this.client.capturePayment(externalId);

      return {
        ...newData,
        id: externalId,
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const externalId = paymentSessionData.id;

    try {
      // https://ap-gateway.mastercard.com/api/documentation/apiDocumentation/rest-json/version/100/operation/Session%3a%20Retrieve%20Session.html?locale=en_US
      // assuming you have a client that retrieves the payment
      return await this.client.retrieve(externalId);
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async cancelPayment(
    paymentData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    console.log("CancelPaymentData: ", paymentData);

    try {
      // assuming you have a client that cancels the payment
      return {
        data: {},
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    console.log("PaymentSessionData: ", paymentSessionData);
    // const externalId = paymentSessionData.id;

    try {
      // assuming you have a client that cancels the payment
      // return await this.client.cancelPayment(externalId);
      return {
        data: {},
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    const externalId = paymentSessionData.id;

    try {
      // assuming you have a client that retrieves the payment status
      const status = await this.client.getStatus(externalId);

      switch (status) {
        case "requires_capture":
          return "authorized";
        case "success":
          return "captured";
        case "canceled":
          return "canceled";
        default:
          return "pending";
      }
    } catch (e) {
      return "error";
    }
  }

  async refundPayment(
    paymentData: Record<string, unknown>,
    refundAmount: number
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    const externalId = paymentData.id;

    try {
      // assuming you have a client that refunds the payment
      const newData = await this.client.refund(externalId, refundAmount);

      return {
        ...newData,
        id: externalId,
      };
    } catch (e) {
      return {
        error: e,
        code: "unknown",
        detail: e,
      };
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const { data, rawData, headers } = payload;

    try {
      switch (data.event_type) {
        case "authorized_amount":
          return {
            action: "authorized",
            data: {
              session_id: (data.metadata as Record<string, any>).session_id,
              amount: new BigNumber(data.amount as number),
            },
          };
        case "success":
          return {
            action: "captured",
            data: {
              session_id: (data.metadata as Record<string, any>).session_id,
              amount: new BigNumber(data.amount as number),
            },
          };
        default:
          return {
            action: "not_supported",
          };
      }
    } catch (e) {
      return {
        action: "failed",
        data: {
          session_id: (data.metadata as Record<string, any>).session_id,
          amount: new BigNumber(data.amount as number),
        },
      };
    }
  }
}

export default MPGSProviderService;

// const tokenizeCardUrl =
//   this.options_.msoUrl +
//   `/api/rest/version/100/merchant/${this.options_.merchantId}/token`;

// const tokenizeData = {
//   session: {
//     id: paymentData.session.id,
//   },
//   sourceOfFunds: {
//     type: "CARD",
//   },
// };

// const tokenizeResponse = await fetch(tokenizeCardUrl, {
//   method: "POST",
//   body: JSON.stringify(tokenizeData),
//   headers: {
//     Authorization: `Basic ${authToken}`,
//     "Content-Type": "application/json",
//   },
// });
// if (tokenizeResponse.ok) {
//   const tokenizeData = await tokenizeResponse.json();
//   console.log("Tokenize data: ", tokenizeData);
//   return {
//     data: { token_id: tokenizeData.token },
//   };
// }
// console.log("Tokenize response: ", tokenizeResponse);
