import path from "path";
import fs from "fs-extra";

export default async function handler(req, res) {
  const { region } = req.query;
  const root = process.cwd();
  const data = await fs.readJSON(path.join(root, "data", `${region}.json`));
  res.status(200).json(data);
}
