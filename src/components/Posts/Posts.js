"use client";
import { addEditOrDeletePost } from "@/lib/feedAPI";
import Form from "next/form";
import { useState } from "react";
import Post from "../Post/Post";
import styles from "./styles.module.css";

export default function Posts({ posts }) {
  const [caption, setCaption] = useState("");
  const [showInput, setShowInput] = useState(false);

  function toggleInputField(e) {
    return setShowInput((oldValue) => !oldValue);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      post_id: e.target.name,
      caption: caption,
    };
    return await addEditOrDeletePost("PUT", body);
  }

  async function handleClick(e) {
    e.preventDefault();
    const body = { post_id: e.target.value };
    return await addEditOrDeletePost("DELETE", body);
  }

  function mapPosts() {
    if (posts)
      return posts.map((post) => (
        <div key={post.post_id} className={styles.post}>
          <div className={styles.postComponent}>
            <Post post={post} />
          </div>
          <div className={styles.buttons}>
            <Form onSubmit={(e) => handleSubmit(e)} name={post.post_id}>
              {showInput ? (
                <input
                  type="text"
                  onChange={(e) => setCaption(e.target.value)}
                ></input>
              ) : (
                ""
              )}
              {/* CHECK USERNAME OF LOGGED IN USER HERE */}
              {post.username === "mols12" ? (
                <button
                  className={styles.button}
                  onClick={(e) => toggleInputField(e)}
                >
                  edit
                </button>
              ) : (
                ""
              )}
            </Form>
            {post.username === "mols12" ? (
              <button
                className={styles.button}
                value={post.post_id}
                onClick={(e) => handleClick(e)}
              >
                x
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ));
  }
  return <div className={styles.posts}>{mapPosts()}</div>;
}
