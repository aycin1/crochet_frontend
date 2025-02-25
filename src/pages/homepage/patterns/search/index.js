"use client";
import { useEffect, useState } from "react";

export default function Search({ searchField }) {
  const [randomiser, setRandomiser] = useState(null);

  useEffect(() => {
    async function fetchRandoms() {
      if (!searchField) {
        const random = await getRandomPatterns();
        setRandomiser(random);
      }
    }
    fetchRandoms();
  }, []);

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
    return res[0];
  }

  return (
    <div>{randomiser ? JSON.stringify(randomiser) : console.log("uh-oh")}</div>
  );
}
