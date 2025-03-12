"use client";
import { getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function ListDropdown({ patternID }) {
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      setLists(await getLists());
    }
    fetchLists();
  }, [patternID]);

  const options = [
    { value: "wishlist", label: "Wishlist" },
    { value: "wip", label: "WIP" },
    { value: "completed", label: "Completed" },
    { value: "ownPatterns", label: "Own pattern" },
  ];

  async function apiCall(method, listEdit) {
    let res;
    try {
      const request = await fetch(`http://localhost:2501/home/`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listEdit),
        credentials: "include",
      });
      if (request.ok) {
        const response = await request.json();
        setMessage(response.message);
        return response;
      } else {
        setError(`Error ${request.status}:${request.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      res = { response: null, statusCode: 500 };
    }
    return res;
  }

  async function handleChange(e) {
    const desiredList = e.value;
    if (lists !== undefined || lists !== null) {
      const isInDesiredList = lists[desiredList].find(
        (pattern) => pattern.pattern_id === patternID
      );
      const isInAnyList = Object.values(lists).map((list) => {
        if (list.length) {
          return list.find((pattern) => pattern.pattern_id === patternID);
        }
      });
      const inAnyList = isInAnyList.find((list) => list !== undefined);
      return inAnyList === undefined
        ? await apiCall("POST", { pattern_id: patternID, list: desiredList })
        : inAnyList !== undefined && isInDesiredList === undefined
        ? await apiCall("PATCH", { pattern_id: patternID, list: desiredList })
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
      {message ? <p>{message}</p> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
