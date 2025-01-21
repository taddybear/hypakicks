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

    if (context && "apple_pay" in context) {
      const authToken = this.generateAuthToken();
      const url =
        this.options_.msoUrl +
        // @ts-ignore
        `/api/rest/version/100/merchant/${this.options_.merchantId}/order/Ord_${context.cart_id}/transaction/Txn_${context.cart_id}`;
      console.log("\n\napple pay context data", context.apple_pay, "\n\n");
      const body = {
        apiOperation: "AUTHORIZE",
        order: {
          currency: "AED",
          amount: "5656",
          walletProvider: "APPLE_PAY",
        },
        sourceOfFunds: {
          type: "CARD",
          provided: {
            card: {
              devicePayment: {
                paymentToken: JSON.stringify(context.apple_pay),
              },
            },
          },
        },
        transaction: {
          source: "INTERNET",
        },
      };

      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Apple Pay response: ", data);

      if (response.ok) {
        console.log("Sending success response for apple pay", data.result);
        if (data.result === "SUCCESS") {
          return {
            data: { apple_pay_result: data.result },
          };
        }
      }
      console.log("Sending failure response for apple pay", data.result);
      return {
        data: { apple_pay_result: "FAILED" },
      };
    }

    console.log("Initiate payment context: ", Context);
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

      // console.log("Payment session initiate response: ", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Session Data: ", data);
        if (data.result === "SUCCESS") {
          const paymentUrl = url + `/${data.session.id}`;
          // @ts-ignore
          const cardNumber = context.card_number.replace(/ /g, "");
          // @ts-ignore
          const expiryDate = context.expiry_date.replace(/ /g, "");
          const payerData = {
            sourceOfFunds: {
              provided: {
                card: {
                  // @ts-ignore
                  nameOnCard: context.name_on_card,
                  // @ts-ignore
                  number: cardNumber,
                  expiry: {
                    // @ts-ignore
                    month: expiryDate.substring(0, 2),
                    // @ts-ignore
                    year: expiryDate.substring(3, 5),
                  },
                  // @ts-ignore
                  securityCode: context.security_code,
                },
              },
            },
          };
          console.log("Payer Data: ", payerData.sourceOfFunds.provided.card);
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
            console.log(
              "Payment Data: ",
              paymentData.sourceOfFunds.provided.card
            );
            const threeDSecure = await this.threeDSecureInitiate(
              // @ts-ignore
              context.cart_id,
              // @ts-ignore
              context.payment_attempt,
              paymentData.session.id,
              Number(amount),
              currency_code
            );

            if (threeDSecure) {
              console.log("Three3d secure data", threeDSecure);
              // paymentSessionData = {
              //   payment_attempt,
              //   sessionId,
              //   amount,
              // }

              // context = {
              //   cart_id
              // }
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
    payment_attempt: number,
    session_id: string,
    amount: number,
    country_code: string
  ) {
    console.log("Initiate 3DS", cart_id, session_id, amount);
    const authToken = this.generateAuthToken();
    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/order/OrdID_${cart_id}_${payment_attempt}/transaction/TxnID_${cart_id}_${payment_attempt}`;

    const payload = {
      apiOperation: "INITIATE_AUTHENTICATION",
      correlationId: cart_id,
      order: {
        currency: "AED",
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

    // const data = await response.json();
    // console.log("Initiate 3ds response:", data);

    if (response.ok) {
      const data = await response.json();
      console.log("Initiate 3DS Data: ", data);
      const threeDSresponse = data.response;
      // if (
      //   threeDSresponse &&
      //   threeDSresponse.gatewayRecommendation === "PROCEED"
      // ) {
      //   console.log("Go to payment");
      // go directly to payment
      return {
        data: {
          threeDS: false,
          amount: amount,
          sessionId: session_id,
          payment_attempt: payment_attempt,
        },
      };
      // } else {
      //   // redirect to 3DS page
      //   return await this.threeDSecureAuthenticate(
      //     cart_id,
      //     payment_attempt,
      //     session_id,
      //     amount,
      //     country_code
      //   );
      // }
    }
  }

  async threeDSecureAuthenticate(
    cart_id: string,
    payment_attempt: number,
    session_id: string,
    amount: number,
    country_region: string
  ) {
    const authToken = this.generateAuthToken();
    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/order/OrdID_${cart_id}_${payment_attempt}/transaction/TxnID_${cart_id}_${payment_attempt}`;

    const payload = {
      apiOperation: "AUTHENTICATE_PAYER",
      authentication: {
        redirectResponseUrl: "http://localhost:8000/us/checkout",
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
        currency: "AED",
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
    const data = await response.json();
    console.log("Authenticate 3ds response:", data);
    if (response.ok) {
      console.log("Authenticate 3DS Data: ", data);
      const authenticationHtml = data.authentication.redirectHtml;
      return {
        data: {
          threeDS: true,
          payment_attempt: payment_attempt,
          html: authenticationHtml,
          amount: amount,
          sessionId: session_id,
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
    console.log("Authorize payment");
    console.log("Payment session data: ", paymentSessionData);
    console.log("Context: ", context);
    // try {

    const authToken = this.generateAuthToken();
    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/order/OrdID_${context.cart_id}_${paymentSessionData.payment_attempt}/transaction/Pay_${context.cart_id}_${paymentSessionData.payment_attempt}`;

    const payload = {
      apiOperation: "PAY",
      authentication: {
        transactionId:
          "TxnID_" + context.cart_id + "_" + paymentSessionData.payment_attempt,
      },
      order: {
        amount: paymentSessionData.amount,
        // currency: String(paymentSessionData.currency_code).toUpperCase(),
        currency: "AED",
        reference: "OrdID_" + context.cart_id,
      },
      transaction: {
        reference: context.cart_id,
      },
      session: {
        id: paymentSessionData.sessionId,
      },
      sourceOfFunds: {
        type: "CARD",
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
    const data = await response.json();
    console.log("Authorization response: ", data);
    // console.log(data.risk.response.review);
    // console.log(data.risk.response.rule);
    if (response.ok) {
      if (data.result === "SUCCESS") {
        if (data.order.status === "CAPTURED") {
          return {
            data: { session_id: paymentSessionData.sessionId },
            status: "captured",
          };
        }
      }
    }
    console.log("Returning same data");
    return {
      data: {
        threeDS: false,
        amount: paymentSessionData.amount,
        sessionId: paymentSessionData.sessionId,
        payment_attempt: paymentSessionData.payment_attempt,
      },
      status: "canceled",
    };
    // console.log("Response", response);
    // return {
    //   error: "Error",
    // };
    // } catch (e) {
    //   return {
    //     error: e,
    //     code: "unknown",
    //     detail: e,
    //   };
    // }
  }

  async listPaymentMethods(context): Promise<any> {}

  async updatePayment(
    contextUpdate: UpdatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context, data } = contextUpdate;
    console.log("context", context);

    const url =
      this.options_.msoUrl +
      `/api/rest/version/100/merchant/${this.options_.merchantId}/session`;

    const paymentUrl = url + `/${context.session_id}`;
    // @ts-ignore
    const cardNumber = context.card_number.replace(/ /g, "");
    // @ts-ignore
    const expiryDate = context.expiry_date.replace(/ /g, "");
    const payerData = {
      sourceOfFunds: {
        provided: {
          card: {
            // @ts-ignore
            nameOnCard: context.name_on_card,
            // @ts-ignore
            number: cardNumber,
            expiry: {
              // @ts-ignore
              month: expiryDate.substring(0, 2),
              // @ts-ignore
              year: expiryDate.substring(3, 5),
            },
            // @ts-ignore
            securityCode: context.security_code,
          },
        },
      },
    };
    // console.log("Payer Data: ", payerData.sourceOfFunds.provided.card);
    // const authToken = this.generateAuthToken();
    // const paymentResponse = await fetch(paymentUrl, {
    //   method: "PUT",
    //   body: JSON.stringify(payerData),
    //   headers: {
    //     Authorization: `Basic ${authToken}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (paymentResponse.ok) {
    //   const paymentData = await paymentResponse.json();
    //   console.log("Payment Data: ", paymentData.sourceOfFunds.provided.card);
    //   const threeDSecure = await this.threeDSecureInitiate(
    //     // @ts-ignore
    //     context.cart_id,
    //     // @ts-ignore
    //     context.payment_attempt,
    //     context.session_id || "",
    //     Number(amount),
    //     currency_code
    //   );

    //   console.log("THree RESULT", threeDSecure);

    //   if (threeDSecure) {
    //     return { data: threeDSecure.data };
    //   }

    //   return {
    //     data: {
    //       payment_id: paymentData.session.id,
    //       amount: amount,
    //       currency_code: currency_code,
    //     },
    //   };
    // }
    return {
      data: { session_id: context.session_id },
    };
    return {
      data: {},
    };
  }

  async capturePayment(
    paymentData: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse["data"]> {
    console.log("CapturePaymentData: ", paymentData);
    // const externalId = paymentData.id;

    try {
      // assuming you have a client that captures the payment
      // const newData = await this.client.capturePayment(externalId);

      return {
        // ...newData,
        id: paymentData.session_id,
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
