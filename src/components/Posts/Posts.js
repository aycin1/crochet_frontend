import Post from "../Post/Post";
import styles from "./styles.module.css";
export default function Posts({ posts }) {
  function mapPosts() {
    if (posts)
      return posts.map((post) => (
        <div className={styles.post} key={post.post_id}>
          <Post post={post} />
        </div>
      ));
  }
  return <div className={styles.posts}>{mapPosts()}</div>;
}
