import { SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";
import { Modules } from "@medusajs/framework/utils";
import {
  createCustomer,
  getCustomer,
  sendPasswordResetEmail,
} from "src/utils/klaviyo/sendEmail";

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const logger = container.resolve("logger");
  console.log("reset subscriber emitted");
  try {
    let customer = await getCustomer(email);
    console.log("customer", customer);
    if (!customer.data) {
      customer = await createCustomer({
        email: email,
      });
    }

    await sendPasswordResetEmail(email, token);

    logger.info(`Customer notified for password reset`);
  } catch (error) {
    logger.error("Error processing handle password reset", error);
  }
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
};
