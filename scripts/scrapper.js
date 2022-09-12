const scrapper = require("../utils/scrapper");

scrapper(
  "https://www.calendarioslaborales.com/calendario-laboral-barcelona-2022.htm"
).then((result) => {
  fs.writeFileSync("data.json", JSON.stringify(result));
});
