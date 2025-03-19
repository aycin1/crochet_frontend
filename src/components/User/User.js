"use client";
import { followUser, isFollowing, unfollowUser } from "@/lib/usersAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function User({ foundUser, searchField }) {
  const [buttonText, setButtonText] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function settingButtonText() {
      const isFollowingUser = await isFollowing(searchField);
      if (isFollowingUser) {
        setButtonText("unfollow");
      } else {
        setButtonText("follow");
      }
    }
    settingButtonText();
  }, [foundUser, buttonText, message]);

  async function handleFollowClick(e) {
    if (buttonText === "follow") {
      const response = await followUser({ following_user: searchField });
      if (response.message) setMessage(response.message);
      return response;
    } else if (buttonText === "unfollow") {
      const response = await unfollowUser({ unfollowing_user: searchField });
      if (response.message) setMessage(response.message);
      return response;
    }
  }

  return (
    <div className={styles.userContainer}>
      <div className={styles.linkAndButtonContainer}>
        <Link href={`/user/${foundUser}`}>{foundUser}</Link>
      </div>
      <div>
        <button className={styles.button} onClick={(e) => handleFollowClick(e)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
