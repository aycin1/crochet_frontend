"use client";
import DisplayLists from "@/components/DisplayListButtons/DisplayListButtons";
import { createPatterns } from "@/lib/createPatterns";
import { getLists } from "@/lib/listsAPI";
import { renderSearchButton } from "@/lib/renderSearchButton/renderSearchButton";
import { useEffect, useState } from "react";

export default function ListDashboard() {
  const [chosenList, setChosenList] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [chosenList]);

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
