import Posts from "@/components/Posts/Posts";
import { getPostsForUser } from "@/lib/usersAPI";

export default async function UserProfile({ params }) {
  const { username } = await params;
  const { posts } = await getPostsForUser(username);

  return (
    <div>
      <h4>{username}</h4>
      <Posts posts={posts} />
    </div>
  );
}
