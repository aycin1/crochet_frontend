import Link from "next/link";
import styles from "./styles.module.css";
export function renderSearchButton() {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchText}>
        This list is empty, add patterns to see them here!
      </div>
      <Link href="/search">
        <button className={styles.button}>Go to search page</button>
      </Link>
    </div>
  );
}
