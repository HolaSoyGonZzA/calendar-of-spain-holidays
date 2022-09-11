const fs = require("fs");
const { chromium } = require("playwright");

const getDateFromText = (text) => {
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const day = text.split(/\s/)[0];
  const month = monthNames.indexOf(text.split(/\s/)[2]);
  const currentYear = new Date().getFullYear();
  return { currentYear, month, day };
};

async function main() {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto(
    "https://ajuntament.barcelona.cat/hisenda/es/informacion-general/calendario-de-festivos-dias-inhabiles"
  );

  const content = await page.$$("table tbody td");

  const result = await Promise.all(
    content.map(async (el) => await el.innerText())
  );

  const json = result.slice(0, -3).map((el) => {
    const { currentYear, month, day } = getDateFromText(el);
    return {
      text: el.split(/\s/).slice(0, -1).join(" "),
      date: new Date(currentYear, month, day),
      month,
      day,
    };
  });

  fs.writeFileSync("data.json", JSON.stringify(json));

  await browser.close();
}

main();
