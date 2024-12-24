import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { sendOrderConfirmationWorkflow } from "../workflows/send-order-confirmation";
// install and import { createAdminApiClient } from "@shopify/admin-api-client";

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger");

  // export const createClient = (domain: string, accessToken: string) => {
  //   try {
  //     const client = createAdminApiClient({
  //       storeDomain: domain,
  //       apiVersion: "2024-10",
  //       accessToken: accessToken,
  //     });
  //     return client;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // const shopifyDomain = process.env.SHOPIFY_DOMAIN;
  // const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  // const client = createClient(shopifyDomain, shopifyAccessToken);

  const data = await client.query({
    data: {
      query: `mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
          }
        }
      }`,
      variables: {
        input: {
          customerId: "gid://shopify/Customer/544365967",
          note: "Test draft order",
          email: "test.user@shopify.com",
          taxExempt: true,
          tags: ["foo", "bar"],
          shippingLine: {
            title: "Custom Shipping",
            price: 4.55,
          },
          shippingAddress: {
            address1: "123 Main St",
            city: "Waterloo",
            province: "Ontario",
            country: "Canada",
            zip: "A1A 1A1",
          },
          billingAddress: {
            address1: "456 Main St",
            city: "Toronto",
            province: "Ontario",
            country: "Canada",
            zip: "Z9Z 9Z9",
          },
          appliedDiscount: {
            description: "damaged",
            value: 5.0,
            amount: 5.0,
            valueType: "FIXED_AMOUNT",
            title: "Custom",
          },
          lineItems: [
            {
              title: "Custom product",
              originalUnitPrice: 14.99,
              quantity: 5,
              appliedDiscount: {
                description: "wholesale",
                value: 5.0,
                amount: 3.74,
                valueType: "PERCENTAGE",
                title: "Fancy",
              },
              weight: {
                value: 1,
                unit: "KILOGRAMS",
              },
              customAttributes: [
                {
                  key: "color",
                  value: "Gold",
                },
                {
                  key: "material",
                  value: "Plastic",
                },
              ],
            },
            {
              variantId: "gid://shopify/ProductVariant/43729076",
              quantity: 2,
            },
          ],
          customAttributes: [
            {
              key: "name",
              value: "Achilles",
            },
            {
              key: "city",
              value: "Troy",
            },
          ],
        },
      },
    },
  });

  console.log("Draft order created: ", data);

  logger.info("Sending confirmation email...");

  await sendOrderConfirmationWorkflow(container).run({
    input: {
      id: data.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: `order.placed`,
};
