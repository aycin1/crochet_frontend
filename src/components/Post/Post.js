"use client";
import Likes from "../Likes/Likes";
import PatternCard from "../PatternCard/PatternCard";

export default function Post({ post }) {
  return (
    <div>
      <PatternCard patternID={post.pattern_id} />
      <Likes postID={post.post_id} />
      {/* <Comments postID={post.post_id} /> */}
    </div>
  );
}
