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

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search for patterns!"
          onChange={(e) => setSearchField(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </Form>
      <div className={styles.container}>
        {searchResults
          ? createPatterns(searchResults)
          : randomiser
          ? createPatterns(randomiser)
          : "Fetching patterns"}
      </div>
    </div>
  );
}
