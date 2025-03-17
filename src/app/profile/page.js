import Posts from "@/components/Posts/Posts";
import { getPostsForUser } from "@/lib/usersAPI";

export default async function Profile() {
  const { posts, username } = await getPostsForUser();

  return (
    <div>
      <h4>{username}</h4>
      <Posts posts={posts} />
    </div>
  );
}
