"use client";
import { createPatterns } from "@/lib/createPatterns";
import { getRandomPatterns, searchPatterns } from "@/lib/patternAPI";
import Form from "next/form";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Search() {
  const [randomiser, setRandomiser] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchField, setSearchField] = useState(null);

  useEffect(() => {
    async function fetchRandoms() {
      const random = await getRandomPatterns();
      setRandomiser(random);
    }
    fetchRandoms();
  }, [searchResults]);

  async function handleSubmit(e) {
    e.preventDefault();
    const results = await searchPatterns(searchField);
    setSearchResults(results);
  }

  const thumbnailOptions = {
    url: "medium_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "250px",
      minWidth: "250px",
      overflow: "hidden",
      margin: "-30px -10px -20px -20px",
    },
    maxHeight: "250px",
    withLink: true,
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={styles.input}
            placeholder="Search for patterns!"
            onChange={(e) => setSearchField(e.target.value)}
          ></input>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </Form>
      </div>
      <div className={styles.container}>
        {searchResults
          ? createPatterns(searchResults, thumbnailOptions)
          : randomiser
          ? createPatterns(randomiser, thumbnailOptions)
          : "Fetching patterns"}
      </div>
    </div>
  );
}
