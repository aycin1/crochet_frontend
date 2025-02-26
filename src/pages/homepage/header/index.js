"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
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
    </div>
  );
}
