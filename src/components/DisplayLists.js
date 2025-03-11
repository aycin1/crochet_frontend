"use client";
// import { useState } from "react";
import ListButtons from "./ListButtons";

export default function DisplayLists({ lists, setChosenList }) {
  const listTitles = Object.keys(lists).map((list) => {
    return list;
  });

  const getListButtons = Object.values(lists).map((list, i) => {
    return (
      <ListButtons
        key={listTitles[i]}
        title={listTitles[i]}
        setChosenList={setChosenList}
      />
    );
  });

  return <div>{getListButtons}</div>;
}
