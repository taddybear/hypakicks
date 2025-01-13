import {
  createStep,
  createWorkflow,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";

type WorkflowInput = {
  orderId: string;
};

const stepOne = createStep(
  "retrieve-order-details",
  async ({ orderId }: WorkflowInput, { container }) => {
    const orderModuleService = container.resolve(Modules.ORDER);

    const order = orderModuleService.retrieveOrder(orderId, {
      relations: ["order_address", "order_shipping", "order_items"],
    });

    console.log("Order Retrieved", order);
    return new StepResponse(`Hello from step one!`);
  }
);

// const stepTwo = createStep(
//   "initiate-auth-shopify",
//   async ({ name }: WorkflowInput) => {
//     return new StepResponse(`Hello ${name} from step two!`)
//   }
// )

// const stepThree = createStep(
//   "create-order-shopify",
//   async ({ name }: WorkflowInput) => {
//     return new StepResponse(`Hello ${name} from step two!`)
//   }
// )

type WorkflowOutput = {
  message1: string;
  message2: string;
};

const shopifyOrderPlacedWorkflow = createWorkflow(
  "hello-world",
  (input: WorkflowInput) => {
    const order = stepOne(input);
    // const greeting2 = step2()

    return new WorkflowResponse({
      message1: order,
      // message2: greeting2
    });
  }
);

export default shopifyOrderPlacedWorkflow;
