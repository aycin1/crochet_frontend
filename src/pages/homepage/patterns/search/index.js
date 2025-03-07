"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Patterns from "../";
import Header from "../../header";

export default function Search() {
  const router = useRouter();
  const [randomiser, setRandomiser] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!router.query.searchField) {
      async function fetchRandoms() {
        const random = await getRandomPatterns();
        setRandomiser(random);
      }
      fetchRandoms();
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query.searchField) {
      async function fetchSearchResults() {
        const results = await searchPatterns();
        setSearchResults(results);
      }
      fetchSearchResults();
    }
  }, [router.query]);

  async function getRandomPatterns() {
    let res;
    try {
      const request = await fetch(`http://localhost:2501/patterns/randomiser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await request.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      res = null;
    }
    return res;
  }

  function patternIDsArray(results) {
    return results.map((result) => {
      return { pattern_id: result.id };
    });
  }

  async function searchPatterns() {
    let url = "http://localhost:2501/patterns/refine/";
    if (router.query.searchField) url += `query=${router.query.searchField}`;
    let res;
    try {
      const request = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      res = await request.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      res = null;
    }
    return res;
  }

  return (
    <div>
      <Header />
      {searchResults ? (
        <Patterns patternIDs={patternIDsArray(searchResults)} />
      ) : randomiser ? (
        <Patterns patternIDs={patternIDsArray(randomiser)} />
      ) : (
        console.log("uh-oh")
      )}
    </div>
  );
}
