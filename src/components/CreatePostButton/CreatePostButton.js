"use client";
import { useState } from "react";
import CreatePostOverlay from "../CreatePostOverlay/CreatePostOverlay";
import styles from "./styles.module.css";

export default function CreatePostButton() {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    return setIsClicked((oldValue) => !oldValue);
  }

  return (
    <div>
      <button className={styles.addPostButton} onClick={(e) => handleClick(e)}>
        Add a post
      </button>
      {isClicked ? <CreatePostOverlay isClicked={isClicked} /> : ""}
    </div>
  );
}
