"use client";
import {
  followUser,
  isFollowing,
  searchUsers,
  unfollowUser,
} from "@/lib/usersAPI";
import Form from "next/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function UserSearch() {
  const [searchField, setSearchField] = useState();
  const [foundUser, setFoundUser] = useState();
  const [buttonText, setButtonText] = useState();
  const [message, setMessage] = useState();

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
  }, [message]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const { username } = await searchUsers(searchField);
    setFoundUser(username);
  }

  function returnSearchResult() {
    return (
      <div>
        <Link href={`/user/${foundUser}`}>{foundUser}</Link>
        <button onClick={(e) => handleFollowClick(e)}>{buttonText}</button>
      </div>
    );
  }

  return (
    <div className={styles.searchUserContainer}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button type="submit">Search users</button>
          <div>{foundUser ? returnSearchResult() : ""}</div>
          {message ? message : null}
        </div>
      </Form>
    </div>
  );
}
