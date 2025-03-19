"use client";
import Form from "next/form";
import { useState } from "react";
import User from "../User/User";
import styles from "./styles.module.css";

export default function Follows({ followers, following }) {
  const [users, setUsers] = useState([]);
  const followersArr = followers.map((follows) => {
    return follows.username;
  });
  const followingArr = following.map((follows) => follows.following_user);
  const followerCount = followers.length ? followers.length : 0;
  const followingCount = following.length ? following.length : 0;
  const follows = { followers: followersArr, following: followingArr };

  async function handleSubmit(e) {
    e.preventDefault();
    setUsers(follows[e.target.name]);
  }

  function mapUsers() {
    return Object.values(users).map((user, index) => {
      return (
        <div key={index} className={styles.user}>
          <User foundUser={user} searchField={user} />
        </div>
      );
    });
  }

  return (
    <div>
      <div className={styles.followsContainer}>
        <Form name="followers" onSubmit={(e) => handleSubmit(e)}>
          <button className={styles.button} type="submit">
            {JSON.stringify(followerCount) + " followers"}
          </button>
        </Form>
        <Form name="following" onSubmit={(e) => handleSubmit(e)}>
          <button className={styles.button} type="submit">
            {JSON.stringify(followingCount) + " following"}
          </button>
        </Form>
      </div>
      <div className={styles.users}>{users ? mapUsers() : ""}</div>
    </div>
  );
}
