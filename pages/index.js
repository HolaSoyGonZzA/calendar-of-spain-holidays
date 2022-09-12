import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

import data from "../data.json";
import classNames from "classnames";

const date = new Date();

const currentMonthHolidays = data[date.getMonth()];
const nextHolidays = data
  .slice(date.getMonth() + 1, date.getMonth() + 3)
  .filter((el) => el.holidays.length > 0);

const legend = {
  N: "Días Festivos Nacionales",
  R: "Días Festivos Regionales",
  P: "Días Festivos Locales",
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calendario de Vacaciones en España</title>
        <meta name="description" content="Calendario de Vacaciones en España" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Calendario de Vacaciones en España</h1>
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
