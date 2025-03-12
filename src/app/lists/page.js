"use client";
import CreateListCards from "@/components/CreateListCards/CreateListCards";
import { getLists } from "@/lib/listsAPI";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Lists() {
  const [lists, setLists] = useState();

  useEffect(() => {
    async function fetchLists() {
      const listsAPI = await getLists();
      setLists(listsAPI);
    }
    fetchLists();
  }, []);

  return (
    <div className={styles.listCards}>
      <CreateListCards lists={lists}></CreateListCards>
    </div>
  );
}
