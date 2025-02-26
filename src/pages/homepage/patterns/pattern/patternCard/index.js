"use client";
import "@/app/page.module.css";

export default function PatternCard({
  pattern,
  thumbnail,
  title,
  setChosenPattern,
}) {
  return (
    <div className="pattern-card-container">
      <div>{title(pattern)}</div>
      <div className="pattern-photo">{thumbnail(pattern)}</div>
      <button onClick={() => setChosenPattern(pattern)}>Go to pattern</button>
    </div>
  );
}
