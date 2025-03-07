"use-client";
import { useEffect } from "react";

export default function Lists({ lists, setLists, setChosenList }) {
  useEffect(() => {
    async function getLists() {
      const apiCallResponse = await apiCall();
      if (apiCallResponse) {
        setLists(await apiCallResponse);
      }
    }
    getLists();
  }, []);

  async function apiCall() {
    let res;
    try {
      const request = await fetch(`http://localhost:2501/home/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });
      const response = await request.json();
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      res = { response: null, statusCode: 500 };
    }

    return res;
  }

  function setLinks() {
    return lists
      ? Object.keys(lists).map((list, index) => {
          return (
            <div key={index}>
              <button onClick={() => setChosenList(list)}>{list}</button>
            </div>
          );
        })
      : console.log("uh-oh");
  }

  return <div>{lists ? setLinks() : <p>Loading lists...</p>}</div>;
}
