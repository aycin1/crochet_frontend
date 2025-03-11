"use client";
import DisplayLists from "@/components/DisplayLists";
import PatternCard from "@/components/PatternCard/PatternCard";
import { getLists } from "@/lib/listsAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Lists() {
  const [chosenList, setChosenList] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [chosenList]);

  function createPatterns() {
    const patterns = lists[chosenList];
    if (patterns) {
      return patterns.map((pattern) => {
        return (
          <div key={pattern.pattern_id}>
            <PatternCard
              chosenList={chosenList}
              patternID={pattern.pattern_id}
            ></PatternCard>
          </div>
        );
      });
    }
  }

  function renderSearchButton() {
    return (
      <div>
        <div>This list is empty, add patterns to see them here!</div>
        <Link href="/homepage/search">
          <button>Go to search page</button>
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
        ? createPatterns()
        : chosenList
        ? renderSearchButton()
        : "Please select a list"}
    </div>
  );
}
