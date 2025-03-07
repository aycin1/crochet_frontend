"use-client";
import "@/app/page.module.css";
import { useEffect, useState } from "react";
import PatternCard from "./patternCard";

export default function Pattern({ patternID }) {
  const [patternAPI, setPatternAPI] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await apiCall();
      if (response) setPatternAPI(response.pattern);
    }
    fetchData();
  }, [patternID]);

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

  function renderPatternCard() {
    return <PatternCard pattern={patternAPI} />;
  }

  // "Rendering" needs to be changed to the loading pattern cards
  return (
    <div>
      <div>{patternAPI ? renderPatternCard() : <p>Rendering...</p>}</div>
    </div>
  );
}
