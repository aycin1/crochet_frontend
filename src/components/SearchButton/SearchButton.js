import Link from "next/link";
import styles from "./styles.module.css";

export default function RenderSearchButton({ text }) {
  return (
    <Link href="/search">
      <button className={styles.button}>{text}</button>
    </Link>
  );
}
