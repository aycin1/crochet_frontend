"use client";
import { useState } from "react";

export default function Header() {
  const [searchField, setSearchField] = useState(null);

  return <input type="text" placeholder="Search patterns"></input>;
}
