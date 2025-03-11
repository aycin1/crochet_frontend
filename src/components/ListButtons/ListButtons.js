"use client";
import styles from "./styles.module.css";

export default function ListButtons({ title, setChosenList }) {
  function handleClick(e) {
    setChosenList(e.target.name);
  }

  return (
    <div className={styles.buttonDiv}>
      <button
        className={styles.button}
        name={title}
        onClick={(e) => handleClick(e)}
      >
        {title}
      </button>
    </div>
  );
}
