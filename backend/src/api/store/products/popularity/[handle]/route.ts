import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Modules } from "@medusajs/framework/utils";
import { IProductModuleService } from "@medusajs/framework/types";

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const handle = req.params.handle;
  const productModuleService: IProductModuleService = req.scope.resolve(
    Modules.PRODUCT
  );

  const products = await productModuleService.listProducts(
    { handle },
    {
      select: ["id", "metadata"],
    }
  );
  if (products.length > 0) {
    const product = products[0];
    let popularity = 0;
    if (product.metadata && "popularity" in product.metadata) {
      popularity = Number(product.metadata.popularity) + 1;
    } else {
      popularity = 1;
    }

    // Use the product module service
    await productModuleService.updateProducts(product.id, {
      metadata: { popularity },
    });

    res.status(200).json({
      popularity,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}
