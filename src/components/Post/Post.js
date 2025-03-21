"use client";
import { useState } from "react";
import Comments from "../Comments/Comments";
import Likes from "../Likes/Likes";
import PatternCard from "../PatternCard/PatternCard";
import styles from "./styles.module.css";

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  function handleShowComments() {
    setShowComments((oldValue) => !oldValue);
  }

  return (
    <div className={styles.postContainer}>
      {/* INSERT IMAGE FROM IMAGEKIT HERE */}
      <PatternCard className={styles.patternCard} patternID={post.pattern_id} />
      <div className={styles.caption}>
        <div>{post.caption} </div>
        <div>{post.username}</div>
      </div>
      <div className={styles.likesAndComments}>
        <div className={styles.buttonsContainer}>
          <Likes postID={post.post_id} />
          <button
            className={styles.button}
            onClick={(e) => handleShowComments(e)}
          >
            Comments
          </button>
        </div>
        <div className={styles.comments}>
          {showComments ? <Comments postID={post.post_id} /> : ""}
        </div>
      </div>
    </div>
  );
}
