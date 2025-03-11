"use client";
import ListDropdown from "@/components/ListDropdown/ListDropdown";
import PatternCard from "@/components/PatternCard/PatternCard";
import { getRandomPatterns, searchPatterns } from "@/lib/patternAPI";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Search() {
  const [randomiser, setRandomiser] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [searchField, setSearchField] = useState(null);

  useEffect(() => {
    if (!searchField) {
      async function fetchRandoms() {
        const random = await getRandomPatterns();
        setRandomiser(random);
      }
      fetchRandoms();
    }
  }, [searchResults]);

  async function handleClick(e) {
    console.log(e);
    if (searchField) {
      const results = await searchPatterns(searchField);
      setSearchResults(results);
    }
  }

  function createPatterns(patterns) {
    if (patterns) {
      return patterns.map((pattern) => {
        return (
          <div key={pattern.id} className={styles.patternCard}>
            <PatternCard patternID={pattern.id}></PatternCard>
            <ListDropdown patternID={pattern.id}></ListDropdown>
          </div>
        );
      });
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for patterns!"
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <button onClick={(e) => handleClick(e)}>Search</button>
      <div className={styles.container}>
        {searchField
          ? createPatterns(searchResults)
          : randomiser
          ? createPatterns(randomiser)
          : "Could not fetch"}
      </div>
    </div>
  );
}
