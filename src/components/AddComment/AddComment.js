import { postOrDeleteComment } from "@/lib/feedAPI";
import Form from "next/form";
import { useState } from "react";
import styles from "./styles.module.css";

export default function AddComment({ postID, setMessage }) {
  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    const response = await postOrDeleteComment(postID, comment, "POST");
    setMessage(response);
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <label type="submit">
        <input
          className={styles.input}
          placeholder="Comment..."
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </label>
    </Form>
  );
}
