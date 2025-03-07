"use client";
import Link from "next/link";
import Pattern from "./pattern";

export default function Patterns({ patternIDs }) {
  function mapPatterns() {
    return patternIDs.map((pattern) => {
      return (
        <div key={pattern.pattern_id}>
          <Pattern patternID={pattern.pattern_id}></Pattern>
        </div>
      );
    });
  }

  function renderSearchButton() {
    return (
      <div>
        <div>This list is empty, add patterns to see them here!</div>
        <Link href="/homepage/patterns/search">
          <button>Go to search page</button>
        </Link>
      </div>
    );
  }

  return <div>{patternIDs.length ? mapPatterns() : renderSearchButton()}</div>;
}
