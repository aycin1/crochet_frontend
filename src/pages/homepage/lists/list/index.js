"use client";
import Pattern from "../../pattern";

export default function List({ listsTitle, listsContent, chosenList }) {
  function mapPatterns() {
    return listsContent.map((pattern) => {
      return (
        <div key={pattern.pattern_id}>
          <Pattern patternID={pattern.pattern_id}></Pattern>
        </div>
      );
    });
  }

  return <div>{chosenList === listsTitle ? mapPatterns() : listsTitle}</div>;
}
