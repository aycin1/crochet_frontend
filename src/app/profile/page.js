import Posts from "@/components/Posts/Posts";
import UserSearch from "@/components/UserSearch/UserSearch";
import { getPostsForUser } from "@/lib/usersAPI";
import styles from "./styles.module.css";

export default async function Profile() {
  const { posts, username } = await getPostsForUser();

  return (
    <div className={styles.profileWrapper}>
      <h4>{username}</h4>
      <div className={styles.profile}>
        <div className={styles.posts}>
          <Posts posts={posts} />
        </div>
        <div className={styles.userSearch}>
          <UserSearch />
        </div>
      </div>
    </div>
  );
}
