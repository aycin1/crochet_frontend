"use client";
import { addEditOrDeletePost } from "@/lib/feedAPI";
import Form from "next/form";
import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectPattern from "../SelectPattern/SelectPattern";
import styles from "./styles.module.css";

export default function CreatePostOverlay({ isClicked, handleClick }) {
  const [chosenPatternID, setChosenPatternID] = useState(null);
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      pattern_id: chosenPatternID,
      caption: caption,
      // NEEDS TO BE SORTED:
      file_name: caption,
    };
    if (!chosenPatternID)
      return setMessage("You must choose a pattern to create a post");
    return await addEditOrDeletePost("POST", body);
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className={styles.overlayContainer}>
      <button
        className={styles.closeOverlayButton}
        onClick={(e) => handleClick(e)}
      >
        x
      </button>
      {!chosenPatternID ? (
        <SelectPattern
          isClicked={isClicked}
          setChosenPatternID={setChosenPatternID}
        />
      ) : (
        <button onClick={() => setChosenPatternID(null)}>
          back to pattern selection
        </button>
      )}
      <ImageUpload />
      <input
        type="text"
        className={styles.input}
        placeholder="  Caption"
        onChange={(e) => setCaption(e.target.value)}
      ></input>
      <button className={styles.submitButton} type="submit">
        Post
      </button>
      {message ? message : null}
    </Form>
  );
}
