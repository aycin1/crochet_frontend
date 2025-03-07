"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchField, setSearchField] = useState(null);

  return (
    <div>
      <input
        type="text"
        placeholder="Search patterns"
        onChange={(e) => setSearchField(e.target.value)}
      ></input>
      <Link
        href={{
          pathname: "/homepage/patterns/search/",
          query: { searchField: searchField },
        }}
      >
        <button>Search</button>
      </Link>
      <Link href={"/homepage"}>Lists</Link>
    </div>
  );
}
