"use-client";
import "@/app/page.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PatternCard from "./patternCard";

export default function Pattern({ patternID, thumbnail, title, chosenList }) {
  const [chosenPattern, setChosenPattern] = useState(null);
  const [patternAPI, setPatternAPI] = useState(null);
  const router = useRouter();

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

  function renderPatternPage() {
    return router.push(
      {
        pathname: `/homepage/patterns/pattern/patternPage/${patternID}`,
        query: {
          pattern: JSON.stringify(patternAPI),
        },
      },
      `/homepage/patterns/pattern/patternPage/${patternID}`
    );
  }

  function renderPatternCard() {
    return (
      <PatternCard
        pattern={patternAPI}
        thumbnail={thumbnail}
        title={title}
        chosenPattern={chosenPattern}
        setChosenPattern={setChosenPattern}
      />
    );
  }

  return (
    <div>
      <div>
        {chosenList && patternAPI ? renderPatternCard() : <p>Loading...</p>}
      </div>
      <div>{chosenPattern ? renderPatternPage() : null}</div>
    </div>
  );
}
