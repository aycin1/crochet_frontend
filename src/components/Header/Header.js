"use client";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link href={"/"}>
        <h2 className={styles.headerTitle}>Fibre fantasies</h2>
      </Link>
      <div className={styles.headerLinks}>
        <div className={styles.links}>
          <Link href={"/lists"}>Lists</Link>
        </div>
        <div className={styles.links}>
          <Link href={"/search"}>Search</Link>
        </div>
        <div className={styles.links}>
          <Link href={"/feed"}>Feed</Link>
        </div>
        <div className={styles.links}>
          <Link href={"/logout"}>Logout</Link>
        </div>
      </div>
    </div>
  );
}
