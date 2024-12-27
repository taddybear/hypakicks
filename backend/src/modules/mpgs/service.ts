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
    _: CreatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    try {
      const authToken = this.generateAuthToken();
      const url =
        this.options_.msoUrl +
        `/api/rest/version/100/merchant/${this.options_.merchantId}/session`;
      console.log("URL: ", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result === "SUCCESS") {
          console.log("Data: ", data.session);
          return {
            data: data.session,
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

  async updatePayment(
    context: UpdatePaymentProviderSession
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    const { amount, currency_code, context: customerDetails, data } = context;
    const externalId = data.id;

    try {
      // assuming you have a client that updates the payment
      const response = await this.client.update(externalId, {
        amount,
        currency_code,
        customerDetails,
      });

      return {
        ...response,
        data: {
          id: response.id,
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
    const externalId = paymentSessionData.id;

    try {
      // assuming you have a client that authorizes the payment
      const paymentData = await this.client.authorizePayment(externalId);

      return {
        data: {
          ...paymentData,
          id: externalId,
        },
        status: "authorized",
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
    const externalId = paymentData.id;

    try {
      // assuming you have a client that cancels the payment
      const paymentData = await this.client.cancelPayment(externalId);
      return paymentData;
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
    const externalId = paymentSessionData.id;

    try {
      // assuming you have a client that cancels the payment
      return await this.client.cancelPayment(externalId);
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
