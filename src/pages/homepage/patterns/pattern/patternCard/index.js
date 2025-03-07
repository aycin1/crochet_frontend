"use client";
import "@/app/page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function PatternCard({ pattern, setChosenPattern }) {
  function thumbnail(pattern) {
    if (pattern) {
      if (!pattern.photos || !pattern.photos[0]) return null;
      const photoUrl = Object.values(pattern.photos)[0].small_url;
      return (
        <div key={pattern.photos.id}>
          <Image
            src={photoUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "auto", width: "15%" }}
            alt={`Image of pattern ${pattern.photos.id}`}
          />
        </div>
      );
    }
  }

  function title(pattern) {
    if (pattern) {
      return (
        <div>
          <h3>{pattern.name}</h3>
        </div>
      );
    }
  }

  function handleAddToList() {}

  return (
    <div className="pattern-card-container">
      <div>{title(pattern)}</div>
      <div className="pattern-photo">{thumbnail(pattern)}</div>
      <button onClick={() => handleAddToList()}>+</button>
      <Link
        href={{
          pathname: `/homepage/patterns/pattern/patternPage/${pattern.id}`,
          query: { pattern: JSON.stringify(pattern) },
        }}
        as={`/homepage/patterns/pattern/patternPage/${pattern.id}`}
      >
        <button>Go to pattern</button>
      </Link>
    </div>
  );
}
