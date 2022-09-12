const { chromium } = require("playwright");

const scrapper = async (url) => {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  console.log(`Getting data from ${url}`);

  await page.goto(url);

  const monthTables = await page.$$("#wrapIntoMeses .mes");

  const result = await Promise.all(
    monthTables.map(async (el) => {
      const month = (await el.getAttribute("id"))
        .replace("wrap", "")
        .toLowerCase();
      const tds = await el.$$("td");

      const list = await el.$("ul");

      const holidays = await Promise.all(
        tds.map(async (td) => {
          const className = await td.getAttribute("class");
          if (className) {
            const day = await td.textContent();
            const title = list
              ? (await list.innerText())
                  .split("\n")
                  .filter((item) => item.startsWith(day))
                  .map((item) => item.split(".")[1])
                  .join("")
              : "";
            const type = className.slice(-1);
            return { day, title, type };
          }
        })
      );

      return { month, holidays: holidays.filter(Boolean) };
    })
  );

  await browser.close();

  console.log("Done!");

  return result;
};

module.exports = scrapper;
