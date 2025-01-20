import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const url =
    "https://apple-pay-gateway.apple.com/paymentservices/paymentSession";
  const body = {
    merchantIdentifier: "merchant.com.railway.hypakicks",
    displayName: "Hypakicks",
    initiative: "web",
    initiativeContext: "insightful-forgiveness-production.up.railway.app",
  };
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });

  const merchantSession = await response.json();
  console.log("Merchant session", merchantSession);

  res.json(merchantSession);
}
