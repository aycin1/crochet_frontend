"use client";
import { useState } from "react";
import List from "./list";

export default function Lists({ listsPromise }) {
  const [lists, setLists] = useState({});
  const [chosenList, setChosenList] = useState(false);

  if (listsPromise)
    listsPromise.then((lists) => {
      setLists(lists);
    });

  function setLinks() {
    return lists
      ? Object.keys(lists).map((list, index) => {
          return (
            <div key={index}>
              <button onClick={() => setChosenList(list)}>{list}</button>
            </div>
          );
        })
      : console.log("uh-oh");
  }

  return (
    <div>
      {lists ? setLinks() : <p>Hello</p>}
      {chosenList ? (
        <List
          listsTitle={chosenList}
          listsContent={lists[chosenList]}
          chosenList={chosenList}
        />
      ) : null}
    </div>
  );
}
