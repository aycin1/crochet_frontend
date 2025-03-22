"use client";
import { getComments, postOrDeleteComment } from "@/lib/feedAPI";
import { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import styles from "./styles.module.css";

export default function Comments({ postID }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchComments() {
      setComments(await getComments(postID));
    }
    fetchComments();
  }, [postID]);

  async function handleCommentDeletion(e) {
    const { message } = await postOrDeleteComment(
      postID,
      e.target.value,
      "DELETE"
    );
    setMessage(message);
  }

  function mapComments() {
    return comments.map((comment, index) => {
      return (
        <div key={index} className={styles.commentContainer}>
          <div className={styles.comment}>
            <div>{comment.message}</div>
            <div className={styles.commentUsername}>
              {comment.comment_username}
            </div>
          </div>
          {comment.comment_username === "mols12" ? (
            <button
              value={comment.message}
              className={styles.deleteButton}
              onClick={(e) => handleCommentDeletion(e)}
            >
              delete
            </button>
          ) : (
            ""
          )}
        </div>
      );
    });
  }

  return (
    <div className={styles.commentsContainer}>
      <div>{comments.length ? mapComments() : ""}</div>
      <div className={styles.message}>{message ? message : null}</div>
      <AddComment postID={postID} setMessage={setMessage} />
    </div>
  );
}
