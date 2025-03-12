"use client";
import { editList, getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
export default function AddToListDropdown({ patternID, list }) {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [patternID]);

  const options = ["wishlist", "wip", "completed"];

  async function handleChange(e) {
    const desiredList = e.value;
    if (lists !== undefined || lists !== null) {
      const isInDesiredList = list === desiredList;
      const isInAnyList = Object.values(lists).map((list) => {
        if (list.length) {
          return list.find((pattern) => pattern.pattern_id === patternID);
        }
      });
      const inAnyList = isInAnyList.find((list) => list !== undefined);
      return inAnyList === undefined
        ? await editList(
            "POST",
            { pattern_id: patternID, list: desiredList },
            setError,
            setMessage
          )
        : inAnyList !== undefined && isInDesiredList === undefined
        ? await editList(
            "PATCH",
            { pattern_id: patternID, list: desiredList },
            setError,
            setMessage
          )
        : setMessage(`This pattern is already in your ${desiredList}`);
    }
  }

  return (
    <div>
      <Dropdown
        options={options}
        placeholder="Add to list..."
        onChange={(e) => handleChange(e)}
      />
      <div style={{ display: "inline" }}>
        {message ? <p>{message}</p> : null}
      </div>
      <div>{error ? <p>{error}</p> : null}</div>
    </div>
  );
}
