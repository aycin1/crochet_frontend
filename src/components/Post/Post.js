"use client";
import Link from "next/link";
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
      <div className={styles.patternCardContainer}>
        <PatternCard
          patternID={post.pattern_id}
          thumbnailOptions={{
            url: "thumbnail_url",
            style: {
              width: "100%",
              height: "auto",
              maxWidth: "70px",
            },
            maxHeight: "70px",
            withLink: true,
          }}
        />
      </div>
      <div className={styles.caption}>
        <div>{post.caption}</div>
        <div className={styles.username}>
          <Link href={`/user/${post.username}`}>{post.username}</Link>
        </div>
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
