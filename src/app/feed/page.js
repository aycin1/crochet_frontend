import Posts from "@/components/Posts/Posts";
import { getPostsForFeed } from "@/lib/feedAPI";

export default async function Feed() {
  const posts = (await getPostsForFeed())["searchPosts"];

  return <Posts posts={posts} />;
}
