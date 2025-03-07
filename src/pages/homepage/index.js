"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import Lists from "./lists";
import Patterns from "./patterns";

export default function Homepage() {
  const [patternIDs, setPatternIDs] = useState([]);
  const [lists, setLists] = useState(null);
  const [chosenList, setChosenList] = useState();

  useEffect(() => {
    if (chosenList) setPatternIDs(lists[chosenList]);
  }, [chosenList]);

  return (
    <div>
      <Header />
      <Lists lists={lists} setLists={setLists} setChosenList={setChosenList} />
      {patternIDs && chosenList ? (
        <Patterns patternIDs={patternIDs}></Patterns>
      ) : (
        "Select a list"
      )}
    </div>
  );
}
