"use client";
import Pattern from "./pattern";

export default function Patterns({ patternIDs }) {
  function mapPatterns() {
    return patternIDs.map((pattern) => {
      return (
        <div key={pattern.pattern_id}>
          <Pattern
            patternID={pattern.pattern_id}
            patternIDs={patternIDs}
          ></Pattern>
        </div>
      );
    });
  }

  function renderSearchButton() {
    return (
      // No hook on button yet
      <div>
        <div>This list is empty, add patterns to see them here!</div>
        <button type="submit">Go to search page</button>
      </div>
    );
  }

  return <div>{patternIDs.length ? mapPatterns() : renderSearchButton()}</div>;
}
