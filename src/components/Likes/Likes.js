"use client";
import { addOrRemoveLike, getLikes, isAlreadyLiked } from "@/lib/feedAPI";
import { useEffect, useState } from "react";

export default function Likes({ postID }) {
  const [likes, setLikes] = useState([]);
  const [alreadyLiked, setAlreadyLiked] = useState();

  useEffect(() => {
    async function checkLikes() {
      setAlreadyLiked(await isAlreadyLiked(postID));
    }
    checkLikes();
  }, [postID]);

  useEffect(() => {
    async function fetchLikes() {
      setLikes((await getLikes(postID))["likedUsers"]);
    }
    fetchLikes();
  }, [alreadyLiked, postID]);

  async function handleClick(e) {
    if (alreadyLiked === false) {
      setAlreadyLiked((oldValue) => !oldValue);
      return await addOrRemoveLike(postID, "POST");
    } else {
      setAlreadyLiked((oldValue) => !oldValue);
      return await addOrRemoveLike(postID, "DELETE");
    }
  }

  return (
    <button onClick={(e) => handleClick(e)}>
      {likes.length ? likes.length : 0}
    </button>
  );
}
