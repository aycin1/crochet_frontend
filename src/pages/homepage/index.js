"use client";
import Lists from "./lists";

export default function Homepage() {
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

  return <div>{<Lists listsPromise={getLists()} />}</div>;
}
