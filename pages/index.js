import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import data from "../data.json";

const date = new Date();

const currentMonthHolidays = data.filter((el) => el.month === date.getMonth());
const nextHolidays = data
  .filter((el) => el.month > date.getMonth())
  .slice(0, 3);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar Of Spain Holidays</title>
        <meta name="description" content="Calendar Of Spain Holidays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Calendar Of Spain Holidays</h1>
        <h2>Holidays of this month</h2>
        <div className={styles.grid}>
          {currentMonthHolidays.map((el) => (
            <div key={el.date} className={styles.card}>
              {el.text}
            </div>
          ))}
        </div>
        <h2>Next holidays</h2>
        <div className={styles.grid}>
          {nextHolidays.map((el) => (
            <div key={el.date} className={styles.card}>
              {el.text}
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
