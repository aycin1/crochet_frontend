"use client";
import {
  followUser,
  isFollowing,
  searchUsers,
  unfollowUser,
} from "@/lib/usersAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function UserSearch() {
  const [searchField, setSearchField] = useState();
  const [searchResults, setSearchResults] = useState();
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

  async function handleSearchClick(e) {
    e.preventDefault();
    const { username } = await searchUsers(searchField);
    setSearchResults(username);
  }

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

  function returnSearchResult() {
    return (
      <div>
        <Link href={`/user/${searchResults}`}>{searchResults}</Link>
        <button onClick={(e) => handleFollowClick(e)}>{buttonText}</button>
      </div>
    );
  }

  return (
    <div className={styles.searchUserContainer}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="Search users"
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button onClick={(e) => handleSearchClick(e)}>Search</button>
      </div>
      <div>{searchResults ? returnSearchResult() : "Click search"}</div>
      {message ? message : null}
    </div>
  );
}
