"use client";
import { getLists } from "@/lib/listsAPI";
import { getPattern } from "@/lib/patternAPI";
import thumbnail from "@/lib/thumbnail";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function SelectPattern({ isClicked, setChosenPatternID }) {
  const [patterns, setPatterns] = useState([]);
  const [urlArray, setUrlArray] = useState([]);

  useEffect(() => {
    function fetchPatterns() {
      if (patterns) {
        const promiseArray = patterns.map(
          async (pattern) => (await getPattern(pattern.pattern_id))["pattern"]
        );
        Promise.all(promiseArray).then(function (results) {
          setUrlArray(results);
        });
      }
    }
    fetchPatterns();
  }, [patterns]);

  useEffect(() => {
    async function fetchLists() {
      const listsObject = await getLists();
      const patternsArr = Object.values(listsObject).flatMap((list) => list);
      setPatterns(patternsArr);
    }
    fetchLists();
  }, [isClicked]);

  function renderImages() {
    if (urlArray.length) {
      return urlArray.map((pattern) => (
        <div
          className={styles.image}
          key={pattern.id || pattern.pattern_id}
          onClick={() => setChosenPatternID(pattern.id || pattern.pattern_id)}
        >
          {thumbnail(pattern, "thumbnail_url", {
            width: "80px",
            height: "auto",
            maxHeight: "75px",
          })}
        </div>
      ));
    }
  }

  return (
    <div className={styles.selectPatternContainer}>
      <p style={{ fontSize: "12pt" }}>
        Select a pattern (from your lists) to link your post to
      </p>
      <div className={styles.imagesContainer}>
        {patterns ? renderImages() : ""}
      </div>
    </div>
  );
}
