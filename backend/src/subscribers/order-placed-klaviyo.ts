import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
// import shopifyOrderPlacedWorkflow from "src/workflows/shopify-order-placed";
import { Modules } from "@medusajs/framework/utils";

export default async function orderPlacedKlaviyoHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Klaviyo order placed handler");
  // const orderModuleService = container.resolve(Modules.ORDER);
  // const order = await orderModuleService.retrieveOrder(data.id, {
  //   relations: [],
  // });
  // console.log("ORDER PLACED HANDLER");
  const logger = container.resolve("logger");

  // console.log("Order:", order);
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
