import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import shopifyOrderPlacedWorkflow from "src/workflows/shopify-order-placed";
import { Modules } from "@medusajs/framework/utils";

export default async function orderPlacedKlaviyoHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Klaviyo order placed handler");
  const orderModuleService = container.resolve(Modules.ORDER);
  const order = await orderModuleService.retrieveOrder(data.id);
  // console.log("ORDER PLACED HANDLER");
  const logger = container.resolve("logger");

  console.log("Order:", order);

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

  // logger.info("Running Shopify Workflow bump");

  // await shopifyOrderPlacedWorkflow(container).run({
  //   input: {
  //     orderId: data.id,
  //   },
  // });
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
