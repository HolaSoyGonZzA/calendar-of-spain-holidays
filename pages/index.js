import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import replaceSpecialCharacters from "replace-special-characters";

import styles from "../styles/Home.module.scss";

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

const legend = {
  N: "Días Festivos Nacionales",
  R: "Días Festivos Regionales",
  P: "Días Festivos Locales",
};

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [region, setRegion] = useState("");
  const [data, setData] = useState([]);

  const [currentMonthHolidays, setCurrentMonthHolidays] = useState({
    holidays: [],
  });
  const [nextHolidays, setNextHolidays] = useState({
    holidays: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const value = replaceSpecialCharacters(region).toLowerCase();
      const response = await fetch(`/api/get-data?region=${value}`);
      const json = await response.json();
      setData(json);
      setLoading(false);
    };

    if (region) fetchData();
  }, [region]);

  useEffect(() => {
    const date = new Date();
    if (data.length) {
      setCurrentMonthHolidays(data[date.getMonth()]);
      setNextHolidays(
        data
          .slice(date.getMonth() + 1, date.getMonth() + 3)
          .filter((el) => el.holidays.length > 0)
      );
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Calendario de Vacaciones en España</h1>

        <label htmlFor="region">Seleccionar localidad:</label>
        <select
          id="region"
          name="region"
          value={region}
          onChange={({ target }) => setRegion(target.value)}
        >
          <option value="" disabled={true}>
            Seleccionar
          </option>
          {regions.map((region) => (
            <option value={region} key={region}>
              {region}
            </option>
          ))}
        </select>

        {!loading ? (
          currentMonthHolidays.holidays.length ? (
            <>
              <h2>Festivos de {currentMonthHolidays.month}</h2>
              <div className={styles.grid}>
                {currentMonthHolidays.holidays.map((el) => (
                  <div
                    key={el.day}
                    className={classNames(styles.card, styles[el.type])}
                  >
                    <h2>{el.title}</h2>
                    <p>{el.day}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              {region &&
                `No hay días festivos en ${currentMonthHolidays.month}...`}
            </p>
          )
        ) : (
          <p>{region && "Cargando días festivos..."}</p>
        )}

        {!loading && nextHolidays.length && (
          <>
            <h2>Próximos días festivos</h2>
            <div className={styles.grid}>
              {nextHolidays.map((el) => (
                <div key={el.month}>
                  <h3>{el.month}</h3>
                  {el.holidays.map((el) => (
                    <div key={el.day} className={classNames(styles[el.type])}>
                      <h4>{el.title}</h4>
                      <p>{el.day}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.legend}>
              {["N", "R", "P"].map((el) => (
                <div key={el}>
                  <span className={classNames(styles.span, styles[el])}></span>
                  <span>{legend[el]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
