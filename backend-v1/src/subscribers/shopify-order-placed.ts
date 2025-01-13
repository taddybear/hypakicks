import {
  OrderService,
  type SubscriberConfig,
  type SubscriberArgs,
} from "@medusajs/medusa";

export default async function productUpdateFacebookHandler({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, any>>) {
  const orderService: OrderService = container.resolve("orderService");

  const { id } = data;
  const order = await orderService.retrieveWithTotals(id, {
    relations: ["cart"],
  });

  console.log("Order Created", order);

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
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "product-update-meta-handler",
  },
};
