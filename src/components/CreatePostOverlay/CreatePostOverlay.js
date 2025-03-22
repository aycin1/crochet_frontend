"use client";
import { addEditOrDeletePost } from "@/lib/feedAPI";
import Form from "next/form";
import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectPattern from "../SelectPattern/SelectPattern";

export default function CreatePostOverlay({ isClicked }) {
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
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        <input
          type="text"
          placeholder="  Caption"
          onChange={(e) => setCaption(e.target.value)}
        ></input>
        <ImageUpload />
        <button type="submit">Post</button>
      </Form>
      {message ? message : null}
    </div>
  );
}
