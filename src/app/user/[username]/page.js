import { getPostsForUser } from "@/lib/usersAPI";

export default async function UserPage({ params }) {
  const { username } = await params;
  const { postsForUser } = await getPostsForUser(username);

  //   DISPLAY POSTS - IMPORT COMPONENT
}
