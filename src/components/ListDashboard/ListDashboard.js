"use client";
import DisplayLists from "@/components/DisplayLists/DisplayLists";
import PatternCard from "@/components/PatternCard/PatternCard";
import { getLists } from "@/lib/listsAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { createPatterns } from "@/lib/createPatterns";

export default function ListDashboard() {
  const [chosenList, setChosenList] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [chosenList]);

  function renderSearchButton() {
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

  return (
    <div>
      {lists ? (
        <DisplayLists lists={lists} setChosenList={setChosenList} />
      ) : (
        "Loading lists"
      )}
      {chosenList && lists[chosenList].length
        ? createPatterns(lists[chosenList])
        : chosenList
        ? renderSearchButton()
        : "Please select a list"}
    </div>
  );
}
