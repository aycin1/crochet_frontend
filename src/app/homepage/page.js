"use client";
import { useState } from "react";
import MapLists from "./mapLists/page";

export default function Homepage() {
  // // useEffect(() => {
  // //   const username = window.localStorage.getItem("username");
  // //   setUsername(username);
  // // }, []);

  // useEffect(
  //   () => {

  //   },

  //   //   // } else {
  //   //   //   console.log("Username is empty, skipping fetch");
  //   []
  // );

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

  async function getLists() {
    const apiCallResponse = await apiCall();
    if (apiCallResponse?.statusCode === 201) return apiCallResponse.response;
  }

  return <div>{<MapLists listsPromise={getLists()} />}</div>;
}
