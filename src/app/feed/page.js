"use server";
import CreatePostButton from "@/components/CreatePostButton/CreatePostButton";
import Posts from "@/components/Posts/Posts";
import { getPostsForFeed } from "@/lib/feedAPI";
import styles from "./styles.module.css";

export default async function Feed() {
  const posts = (await getPostsForFeed())["searchPosts"];

  return (
    <div>
      <CreatePostButton />
      <div className={styles.postsContainer}>
        <Posts posts={posts} />
      </div>
    </div>
  );
}
