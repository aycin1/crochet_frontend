"use client";
import { searchUsers } from "@/lib/usersAPI";
import Form from "next/form";
import { useState } from "react";
import User from "../User/User";
import styles from "./styles.module.css";

export default function UserSearch() {
  const [searchField, setSearchField] = useState();
  const [foundUser, setFoundUser] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const { username } = await searchUsers(searchField);
    setFoundUser(username);
  }

  return (
    <div className={styles.searchUserContainer}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.searchInput}>
          <input
            className={styles.input}
            type="text"
            placeholder="  Username"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </div>
      </Form>
      <div className={styles.userComponent}>
        {foundUser ? (
          <User foundUser={foundUser} searchField={searchField} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
