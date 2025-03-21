"use server";
import CreatePostButton from "@/components/CreatePostButton/CreatePostButton";
import Posts from "@/components/Posts/Posts";
import { getPostsForFeed } from "@/lib/feedAPI";

export default async function Feed() {
  const posts = (await getPostsForFeed())["searchPosts"];

  return (
    <div>
      <CreatePostButton />
      <Posts posts={posts} />
    </div>
  );
}
