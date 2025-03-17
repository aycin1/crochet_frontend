"use client";
import PatternCard from "../PatternCard/PatternCard";

export default function Post({ post }) {
  return <PatternCard patternID={post.pattern_id} />;
}
