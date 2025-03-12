"use client";
import CreateLists from "@/components/CreateLists/CreateLists";
import { getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";

export default function Lists() {
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      const listsAPI = await getLists();
      setLists(listsAPI);
    }
    fetchLists();
  }, []);

  return <CreateLists lists={lists}></CreateLists>;
}
