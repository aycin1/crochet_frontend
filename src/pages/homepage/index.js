"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lists from "./lists";
import Patterns from "./patterns";

export default function Homepage() {
  const [searchField, setSearchField] = useState(null);
  const [patternIDs, setPatternIDs] = useState([]);

  const [lists, setLists] = useState(null);
  const [chosenList, setChosenList] = useState(false);

  useEffect(() => {
    async function getLists() {
      const apiCallResponse = await apiCall();
      setLists(await apiCallResponse.response);
      if (apiCallResponse?.statusCode === 201) return apiCallResponse.response;
    }
    getLists();
  }, []);

  useEffect(() => {
    if (chosenList) setPatternIDs(lists[chosenList]);
  }, [chosenList]);

  function thumbnail(pattern) {
    if (pattern) {
      if (!pattern.photos || !pattern.photos[0]) return null;
      const photoUrl = Object.values(pattern.photos)[0].small2_url;
      return (
        <div key={pattern.photos.id}>
          <Image
            src={photoUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "auto", width: "15%" }}
            alt={`Image of pattern ${pattern.photos.id}`}
          />
        </div>
      );
    }
  }

  function title(pattern) {
    if (pattern) {
      return (
        <div>
          <h3>{pattern.name}</h3>
        </div>
      );
    }
  }

  async function apiCall() {
    let res;
    const username = localStorage.getItem("username");
    try {
      const request = await fetch(`http://localhost:2501/home/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const statusCode = request.status;
      const response = await request.json();
      res = { response, statusCode };
    } catch (error) {
      console.error("Error fetching data:", error);
      res = { response: {}, statusCode: 500 };
    }
    return res;
  }

  return (
    <div>
      {
        // <Lists
        //   listsPromise={lists}
        //   setPatternIDs={setPatternIDs}
        //   setChosenList={setChosenList}
        // />
      }
      {
        chosenList ? (
          <Patterns
            patternIDs={patternIDs}
            thumbnail={thumbnail}
            title={title}
            chosenList={chosenList}
          ></Patterns>
        ) : (
          <Lists
            listsPromise={lists}
            setPatternIDs={setPatternIDs}
            setChosenList={setChosenList}
          />
        )
        // ) : (
        //   "Select a list"
        // )
      }
    </div>
  );
}
