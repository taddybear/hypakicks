import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import shopifyOrderPlacedWorkflow from "src/workflows/shopify-order-placed";
import { Modules } from "@medusajs/framework/utils";

export default async function productUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const productModuleService = container.resolve(Modules.PRODUCT);

  
  const newProduct = await productModuleService.createProducts([
    {
      title: "TEST SUBSCRIBER PRODUCT",
    },
  ]);
  // console.log("ORDER PLACED HANDLER");
  // const logger = container.resolve("logger");

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
  event: "product.updated",
};
