import scrapper from "../../utils/scrapper";

export default async function handler(req, res) {
  const { region } = req.query;
  const year = new Date().getFullYear();
  const data = await scrapper(
    `https://www.calendarioslaborales.com/calendario-laboral-${region}-${year}.htm`
  );
  res.status(200).json(data);
}
