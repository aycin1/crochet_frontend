"use-client";
import { useEffect, useState } from "react";
import PatternCard from "./patternCard";
import PatternPage from "./patternPage/[id]";

export default function Pattern({ patternID }) {
  const [patternAPI, setPatternAPI] = useState(null);
  const [clickedPattern, setClickedPattern] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await apiCall();
      if (response.statusCode === 200) setPatternAPI(response.response);
    }
    fetchData();
  }, [patternID]);

  async function apiCall() {
    let res;

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

      const statusCode = request.status;
      const response = await request.json();
      res = { response, statusCode };
    } catch (error) {
      console.error("Error fetching data:", error);
      res = { response: null, statusCode: 500 };
    }
    return res;
  }

  return (
    <div>
      {clickedPattern && patternAPI ? (
        <PatternPage pattern={patternAPI} />
      ) : patternAPI ? (
        <PatternCard
          pattern={patternAPI}
          setClickedPattern={setClickedPattern}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
