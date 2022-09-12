const scrapper = require("../utils/scrapper");
const replaceSpecialCharacters = require("replace-special-characters");
const path = require("path");
const fs = require("fs-extra");

const regions = [
  "Álava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Baleares",
  "Barcelona",
  "Bilbao",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ceuta",
  "Ciudad Real",
  "Córdoba",
  "Coruña, La",
  "Cuenca",
  "Gijón",
  "Girona",
  "Granada",
  "Guadalajara",
  "Guipuzcoa",
  "Huelva",
  "Huesca",
  "Jaén",
  "León",
  "Lleida",
  "Logroño",
  "Lugo",
  "Madrid",
  "Málaga",
  "Melilla",
  "Murcia",
  "Navarra",
  "Ourense",
  "Oviedo",
  "Palencia",
  "Palma de Mallorca",
  "Palmas (Las)",
  "Pamplona",
  "Pontevedra",
  "Rioja (La)",
  "Salamanca",
  "San Sebastián",
  "Santander",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Tenerife (S.C.)",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vitoria",
  "Vizcaya",
  "Zamora",
  "Zaragoza",
];

const year = new Date().getFullYear();

regions.forEach((region) => {
  const name = replaceSpecialCharacters(region).toLowerCase();
  scrapper(
    `https://www.calendarioslaborales.com/calendario-laboral-${name}-${year}.htm`
  ).then((result) => {
    const dir = path.join("data", `${name}.json`);
    fs.ensureDirSync("data");
    fs.writeJSONSync(dir, result, { encoding: "utf8" });
  });
});
