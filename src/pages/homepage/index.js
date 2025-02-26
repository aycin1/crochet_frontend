"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import Lists from "./lists";
import Patterns from "./patterns";

export default function Homepage() {
  const [patternIDs, setPatternIDs] = useState([]);
  const [lists, setLists] = useState(null);
  const [chosenList, setChosenList] = useState(false);

  useEffect(() => {
    async function getLists() {
      const apiCallResponse = await apiCall();
      setLists(await apiCallResponse.response);
      if (apiCallResponse?.statusCode === 201) return apiCallResponse.response;
    }
    getLists();
  }, []);

  useEffect(() => {
    if (chosenList) setPatternIDs(lists[chosenList]);
  }, [chosenList]);

  return (
    <div>
      <Header />
      {<Lists listsPromise={lists} setChosenList={setChosenList} />}
      {chosenList ? (
        <Patterns patternIDs={patternIDs} chosenList={chosenList}></Patterns>
      ) : (
        "Select a list"
      )}
    </div>
  );
}
