import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

import {
  createCustomer,
  getCustomer,
  sendConfirmationEmail,
} from "src/utils/klaviyo/sendEmail";

export default async function orderPlacedKlaviyoHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  console.log("Klaviyo order placed handler triggered");

  const orderModuleService = container.resolve(Modules.ORDER);
  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: [
      "shipping_address",
      "items",
      "shipping_methods",
      "transactions",
    ],
  });

  if (!order) {
    console.error("Order not found");
    return;
  }

  console.log("Order:", order.transactions);

  const logger = container.resolve("logger");

  try {
    let customer = await getCustomer(order.email);
    console.log("customer", customer);
    if (!customer.data) {
      customer = await createCustomer({
        email: order.email,
      });
    }
    //await subscribeCustomer(order.email,profileId,listId, phonenumber);

    await sendConfirmationEmail(
      order.email,
      order.display_id,
      order.total,
      order.currency_code,
      order.id,
      order.items,
      order.shipping_address,
      order.shipping_methods?.[0],
      order.transactions
    );

    logger.info(`Order ${order.id} processed and customer notified`);
  } catch (error) {
    logger.error("Error processing order for Klaviyo", error);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
