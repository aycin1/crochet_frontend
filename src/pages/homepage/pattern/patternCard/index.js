"use client";
import Image from "next/image";

export default function PatternCard({ pattern, setClickedPattern }) {
  function thumbnail(photo) {
    if (pattern) {
      if (!photo || !photo[0]) return null;
      const photoUrl = Object.values(photo)[0].small2_url;
      console.log(Object.values(photo)[0]);
      return (
        <div key={pattern.id}>
          <Image
            src={photoUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "auto", width: "15%" }}
            alt={`Image of pattern ${pattern.id}`}
          />
        </div>
      );
    }
  }

  function title(name) {
    if (pattern) {
      return (
        <div>
          <h3>{name}</h3>
        </div>
      );
    }
  }

  function handleClick() {
    setClickedPattern(pattern.id);
  }

  return (
    <div className="pattern-card-container" onClick={() => handleClick()}>
      <div className="pattern-photo">{thumbnail(pattern.photos)}</div>
      <div>{title(pattern.name)}</div>
    </div>
  );
}
