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
    const thumbnailOptions = {
      url: "medium_url",
      style: {
        width: "100%",
        height: "auto",
        maxWidth: "150px",
        minWidth: "150px",
        overflow: "hidden",
      },
      maxHeight: "150px",
      withLink: true,
    };
    return (
      <div className={styles.listCardContainer}>
        <div className={styles.searchButton}>
          <SearchButton text="add more patterns here" />
        </div>
        <div className={styles.patternCards}>
          {createPatterns(lists[chosenList], thumbnailOptions, chosenList)}
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
        <div className={styles.searchButton}>
          <SearchButton text="this list is empty, click here to search patterns!" />
        </div>
      ) : (
        "Please select a list"
      )}
    </div>
  );
}
