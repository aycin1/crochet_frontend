"use client";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.headerTitle}>Fibre fantasies</h2>
      <div className={styles.headerLinks}>
        <div className={styles.links}>
          <Link href={"/homepage"}>Home</Link>
        </div>
        <div className={styles.links}>
          <Link href={"/homepage/search"}>Search</Link>
        </div>
        <div className={styles.links}>
          <Link href={"/logout"}>Logout</Link>
        </div>
      </div>
    </div>
  );
}
