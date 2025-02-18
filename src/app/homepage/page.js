"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [lists, setLists] = useState([]);
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const localStorage = window.localStorage.getItem("username");
    setUsername(localStorage ? localStorage : "");
  }, []);

  useEffect(() => {
    async function mapLists() {
      const lists = await getLists();
      setLists(lists);
    }
    mapLists();
  }, [username]);

  async function apiCall() {
    let res;
    if (username) {
      const request = await fetch(`http://localhost:2501/home/${username}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const statusCode = request.status;
      const response = await request.json();
      res = { response, statusCode };
      console.log(res);
    }
    return res;
  }

  async function getLists() {
    const lists = await apiCall();
    if (lists?.statusCode === 201) return lists.response;
  }

  return <div>{JSON.stringify(lists)}</div>;
}
