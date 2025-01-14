import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
// import shopifyOrderPlacedWorkflow from "src/workflows/shopify-order-placed";
import { Modules } from "@medusajs/framework/utils";

export default async function orderPlacedShopifyHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Shopify order placed handler");
  const orderModuleService = container.resolve(Modules.ORDER);
  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: [],
  });
  // console.log("ORDER PLACED HANDLER");
  const logger = container.resolve("logger");

  console.log("Order:", order);

  if (order) {
    const shopifyStoreDomain = process.env.SHOPIFY_STORE_DOMAIN;
    const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (shopifyStoreDomain && shopifyAccessToken) {
      // implement the Shopify authentication and logic
    }
    logger.info(
      "Shopify store domain or access token in undefined. Please set it inside the environment variables."
    );
  }
  logger.info("Order could not be retrieved using the order id in subscriber");

  // try {
  //   const client = createAdminApiClient({
  //     storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  //     apiVersion: "2024-10",
  //     accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  //   });
  //   return client;
  // } catch (err) {
  //   throw err;
  // }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
