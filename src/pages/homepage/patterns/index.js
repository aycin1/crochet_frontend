"use client";
import Pattern from "./pattern";

export default function Patterns({ patternIDs, thumbnail, title, chosenList }) {
  function mapPatterns() {
    if (patternIDs) {
      return patternIDs.map((pattern) => {
        return (
          <div key={pattern.pattern_id}>
            <Pattern
              patternID={pattern.pattern_id}
              thumbnail={thumbnail}
              title={title}
              chosenList={chosenList}
            ></Pattern>
          </div>
        );
      });
    }
  }

  return <div>{chosenList ? mapPatterns() : listsTitle}</div>;
}
