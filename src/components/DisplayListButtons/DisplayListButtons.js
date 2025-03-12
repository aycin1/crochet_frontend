"use client";
import ListButtons from "../ListButtons/ListButtons";
import styles from "./styles.module.css";

export default function DisplayListButtons({ lists, setChosenList }) {
  const listTitles = Object.keys(lists).map((list) => {
    return list;
  });

  const getListButtons = Object.values(lists).map((list, i) => {
    return (
      <div className={styles.button} key={i}>
        <ListButtons
          key={listTitles[i]}
          title={listTitles[i]}
          setChosenList={setChosenList}
        />
      </div>
    );
  });

  return <div className={styles.buttonsContainer}>{getListButtons}</div>;
}
