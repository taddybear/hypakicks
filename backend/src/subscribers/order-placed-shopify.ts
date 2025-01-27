import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { Modules, MedusaError } from "@medusajs/framework/utils";
import fetch from "node-fetch";
import { mutation } from "src/utils/shopify/orderCreateMutation";
import dotenv from "dotenv";
dotenv.config();

export default async function orderPlacedShopifyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Medusa order placed handler");

  const shopifyStoreDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const orderModuleService = container.resolve(Modules.ORDER);
  const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!shopifyAccessToken) {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Shopify access token is not defined"
    );
  }

  try {
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["shipping_address", "items"],
    });

    if (!order) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Order with id ${data.id} not found`
      );
    }

    const productModuleService = container.resolve(Modules.PRODUCT);
    const logger = container.resolve("logger");

    const lineItems: Array<{ variantId: any; quantity: number }> = [];

    for (const item of order.items || []) {
      try {
        console.log("Fetching product variants for item:", item.variant_id);
        //@ts-ignore
        const productVariant = await productModuleService.retrieveProductVariant(item.variant_id);

        if (productVariant) {
          lineItems.push({
            variantId: `gid://shopify/ProductVariant/${productVariant.metadata?.shopify_variant_id}`,
            quantity: item.quantity,
          });
        }
      } catch (error) {
        logger.error("Error fetching product variants:", error);
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          "Error fetching product variants"
        );
      }
    }

    const orderDetails = {
      lineItems,
      billingAddress: {
        firstName: order.shipping_address?.first_name,
        lastName: order.shipping_address?.last_name,
        address1: order.shipping_address?.address_1,
        phone: order.shipping_address?.phone,
        city: order.shipping_address?.city,
        country: order.shipping_address?.country_code?.toUpperCase(),
        zip: order.shipping_address?.postal_code,
      },
      shippingAddress: {
        firstName: order.shipping_address?.first_name,
        lastName: order.shipping_address?.last_name,
        address1: order.shipping_address?.address_1,
        phone: order.shipping_address?.phone,
        city: order.shipping_address?.city,
        country: order.shipping_address?.country_code?.toUpperCase(),
        zip: order.shipping_address?.postal_code,
      },
      email: order.email,
      phone: order.shipping_address?.phone || order.billing_address?.phone,
    };

    const variables = {
      order: orderDetails,
      options: {},
    };

    const response = await fetch(`${shopifyStoreDomain}/admin/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const responseData = await response.json();
    if (responseData.errors) {
      logger.error("Error sending order to Shopify:", responseData.errors);
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Error sending order to Shopify"
      );
    } else {
      logger.info("Order successfully sent to Shopify.");
    }
  } catch (error) {
    console.error("Error retrieving or sending order to Shopify:", error);
    throw error;
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
