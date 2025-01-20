import https from "https";
import fs from "fs";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import axios from "axios";

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

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync("./certs/apple_pay.pem", "utf-8"),
    key: fs.readFileSync("./certs/apple_pay.key", "utf-8"),
    passphrase: "admin",
  });

  const response = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" },
    httpsAgent,
  });

  const merchantSession = response.data;
  console.log("Merchant session", merchantSession);

  res.json(merchantSession);
}
