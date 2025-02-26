"use client";
import "@/app/page.module.css";
import Image from "next/image";

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

  return (
    <div className="pattern-card-container">
      <div>{title(pattern)}</div>
      <div className="pattern-photo">{thumbnail(pattern)}</div>
      <button onClick={() => setChosenPattern(pattern)}>Go to pattern</button>
    </div>
  );
}
