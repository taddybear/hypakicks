import https from "https";
import fs from "fs";
import path from "path";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import axios from "axios";

const certPath = path.join(__dirname, "certs", "merchant_id.pem");
const keyPath = path.join(__dirname, "certs", "merchant.key");

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
    cert: fs.readFileSync(certPath, "utf-8"),
    key: fs.readFileSync(keyPath, "utf-8"),
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
