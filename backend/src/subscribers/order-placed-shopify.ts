
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { getLineItemsTotals, Modules } from "@medusajs/framework/utils";
import fetch from "node-fetch";
import dotenv from 'dotenv';
import { getItemTaxLinesStep } from "@medusajs/medusa/core-flows";

export default async function orderPlacedShopifyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Medusa order placed handler");

  const orderModuleService = container.resolve(Modules.ORDER);
  dotenv.config();
  const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!shopifyAccessToken) {
    throw new Error("Shopify access token is not defined");
  }

  try {
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["shipping_address", "billing_address", "items", "items.variant"],
    }); // items having the details of product and its variants, quantity etc

    const logger = container.resolve("logger");

    if (order) {
      order.items?.forEach(item => {
        // @ts-ignore
        console.log(item.variant); // still giving an error :  TypeError: Cannot read properties of undefined (reading 'reference')
      });
      
      const orderDetails = {
        lineItems: order.items?.map(item => ({
          variantId: `gid://shopify/ProductVariant/50797774471457`, // sttaic for now
          quantity: item.quantity
        })),
        billingAddress: {
          firstName: order.billing_address?.first_name,
          lastName: order.billing_address?.last_name,
          address1: order.billing_address?.address_1,
          phone: order.billing_address?.phone,
          city: order.billing_address?.city,
          country: order.billing_address?.country_code?.toUpperCase(),
          zip: order.billing_address?.postal_code,
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
        phone: order.shipping_address?.phone || order.billing_address?.phone
      };

      // via mutation
      const mutation = `
        mutation M($order: OrderCreateOrderInput!, $options: OrderCreateOptionsInput) {
          orderCreate(order: $order, options: $options) {
            order {
              id
              billingAddress {
                firstName
                lastName
                address1
                phone
                city
                country
                zip
              }
              currencyCode
              customer {
                id
                firstName
                lastName
                email
              }
              discountCodes
              displayFinancialStatus
              displayFulfillmentStatus
              email
              fulfillments(first: 50) {
                location {
                  id
                }
              }
              lineItems(first: 50) {
                nodes {
                  variant {
                    id
                  }
                  title
                  originalUnitPriceSet {
                    shopMoney {
                      amount
                      currencyCode
                    }
                  }
                  quantity
                  taxLines {
                    title
                    rate
                    priceSet {
                      shopMoney {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
              phone
              shippingAddress {
                firstName
                lastName
                address1
                phone
                city
                country
                zip
              }
              taxLines {
                title
                rate
                priceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
              totalTaxSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              transactions {
                kind
                status
                amountSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        order: orderDetails,
        options: {},
      };

      const response = await fetch("https://stag-sports-au.myshopify.com/admin/api/2024-10/graphql.json", {
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
      } else {
        logger.info("Order successfully sent to Shopify:");
      }
    } else {
      logger.info("Order could not be retrieved using the order id in subscriber.");
    }
  } catch (error) {
    console.error("Error retrieving or sending order to Shopify:", error);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
