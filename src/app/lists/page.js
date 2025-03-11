"use client";
import { createPatterns } from "@/lib/createPatterns";
import { getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Lists() {
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      const listsAPI = await getLists();
      console.log(listsAPI);
      setLists(listsAPI);
    }
    fetchLists();
  }, []);

  function createListsCards() {
    if (lists) {
      const listTitles = Object.keys(lists).map((listTitle) => listTitle);
      const list = Object.values(lists).map((listArr, index) => {
        if (listArr.length) {
          return (
            <div key={listTitles[index]} className={styles.listCard}>
              {listTitles[index]}
              <div className={styles.patternCards}>
                {createPatterns(listArr)}
              </div>
            </div>
          );
        } else {
          return (
            <div key={listTitles[index]} className={styles.listCard}>
              {listTitles[index]}
            </div>
          );
        }
      });
      return list;
    }
  }

  return <div className={styles.listCardsContainer}>{createListsCards()}</div>;
}
