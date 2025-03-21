import CreatePostButton from "@/components/CreatePostButton/CreatePostButton";
import Follows from "@/components/Follows/Follows";
import Posts from "@/components/Posts/Posts";
import UserSearch from "@/components/UserSearch/UserSearch";
import { getFollowers, getFollowing, getPostsForUser } from "@/lib/usersAPI";
import styles from "./styles.module.css";

export default async function Profile() {
  const followers = await getFollowers();
  const following = await getFollowing();
  const { posts, username } = await getPostsForUser();

  return (
    <div>
      <CreatePostButton />
      <div className={styles.profileContainer}>
        <h4>{username}</h4>
        <div className={styles.profile}>
          <div className={styles.posts}>
            <Posts posts={posts} />
          </div>
          <div className={styles.usersContainer}>
            <div className={styles.userSearch}>
              <UserSearch />
            </div>
            <div className={styles.follows}>
              <Follows followers={followers} following={following} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
