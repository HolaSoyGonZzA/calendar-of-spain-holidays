import { chromium } from "playwright";

export default async function handler(req, res) {
  const browser = await chromium.launch();
  res.status(200).json({ name: "John Doe" });
}
