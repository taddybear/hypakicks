import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Modules } from "@medusajs/framework/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const cartModule = req.scope.resolve(Modules.CART);
    const { limit = 10, offset = 0 } = req.query;

    const carts = await cartModule.listCarts(
      {
        completed_at: null,
        email: { $ne: null },
      },
      {
        order: {
          created_at: "desc",
        },
        skip: Number(offset),
        take: Number(limit),
      }
    );

    console.log("Carts:", carts);
    res.status(200).send(carts);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
}
