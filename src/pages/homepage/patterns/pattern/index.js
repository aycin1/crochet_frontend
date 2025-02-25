"use-client";
import { useEffect, useState } from "react";
import PatternCard from "./patternCard";
import PatternPage from "./patternPage/[id]";

export default function Pattern({ patternID, thumbnail, title, chosenList }) {
  const [chosenPattern, setChosenPattern] = useState(null);
  const [patternAPI, setPatternAPI] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await apiCall();
      if (response) setPatternAPI(response.pattern);
    }
    fetchData();
  }, [chosenList]);

  async function apiCall() {
    let res;

    if (patternID) {
      try {
        const request = await fetch(
          `http://localhost:2501/patterns/filter/${patternID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await request.json();
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        res = { response: null, statusCode: 500 };
      }
    }
    return res;
  }

  function handleSubmit() {
    setChosenPattern(patternID);
  }

  function renderPatternPage() {
    return (
      <PatternPage pattern={patternAPI} thumbnail={thumbnail} title={title} />
    );
  }

  function renderPatternCard() {
    return (
      <PatternCard
        pattern={patternAPI}
        thumbnail={thumbnail}
        title={title}
        setChosenPattern={setChosenPattern}
      />
    );
  }

  return (
    <div>
      {chosenPattern ? (
        renderPatternPage()
      ) : chosenList && patternAPI ? (
        renderPatternCard()
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
