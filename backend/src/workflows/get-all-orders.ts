import type {
    MedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { getOrdersListWorkflow } from "@medusajs/medusa/core-flows"
  
  export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
  ) {
    const { result } = await getOrdersListWorkflow(req.scope)
      .run({
        input: {
          fields: ["id", "items"],
        }
      })
  
    res.send(result)
  }