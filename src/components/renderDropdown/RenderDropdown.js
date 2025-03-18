"use client";
import AddToListDropdown from "@/components/AddToListDropdown/AddToListDropdown";
import EditListDropdown from "@/components/EditListDropdown/EditListDropdown";
import { editList, getListForPattern, getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";

export default function RenderDropdown({ patternID, list }) {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [lists, setLists] = useState();
  const [listForPattern, setListForPattern] = useState();

  useEffect(() => {
    async function fetchList() {
      if (list === undefined) {
        setListForPattern(
          (await getListForPattern(patternID))["listForPattern"]
        );
      }
    }
    fetchList();
  }, [patternID]);

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [patternID]);

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
        : inAnyList !== undefined && isInDesiredList === false
        ? await editList(
            "PATCH",
            { pattern_id: patternID, list: desiredList },
            setError,
            setMessage
          )
        : setMessage(`This pattern is already in your ${desiredList}`);
    }
  }

  function editOrAddToList(patternID, list) {
    const options = ["wishlist", "wip", "completed"];

    if (list || listForPattern !== undefined) {
      return (
        <div>
          <EditListDropdown
            key={patternID}
            list={list || listForPattern.list}
            options={options}
            handleChange={handleChange}
          />
        </div>
      );
    } else if (!list || listForPattern === undefined) {
      return (
        <div>
          <AddToListDropdown
            key={patternID}
            options={options}
            handleChange={handleChange}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <div>{editOrAddToList(patternID, list)}</div>
      <div>{message ? <p>{message}</p> : null}</div>
      <div>{error ? <p>{error}</p> : null}</div>
    </div>
  );
}
