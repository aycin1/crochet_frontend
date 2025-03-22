"use client";
import DisplayListButtons from "@/components/DisplayListButtons/DisplayListButtons";
import SearchButton from "@/components/SearchButton/SearchButton";
import { createPatterns } from "@/lib/createPatterns";
import { getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function ListDashboard() {
  const [chosenList, setChosenList] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [chosenList]);

  function patternsWithSearchButton() {
    return (
      <div className={styles.listCardContainer}>
        <div className={styles.patternCards}>
          {createPatterns(lists[chosenList], chosenList)}
        </div>
        <div className={styles.searchButton}>
          <SearchButton text="Add more patterns here" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.listButtons}>
      {lists ? (
        <DisplayListButtons lists={lists} setChosenList={setChosenList} />
      ) : (
        "Loading lists"
      )}
      {chosenList && lists[chosenList].length ? (
        patternsWithSearchButton()
      ) : chosenList ? (
        <SearchButton text="This list is empty, click here to search patterns!" />
      ) : (
        "Please select a list"
      )}
    </div>
  );
}
