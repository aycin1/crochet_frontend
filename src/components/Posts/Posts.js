import Post from "../Post/Post";
import styles from "./styles.module.css";
export default function Posts({ posts }) {
  function mapPosts() {
    return posts.map((post) => (
      <div className={styles.post}>
        <Post post={post} />
      </div>
    ));
  }
  return <div className={styles.posts}>{mapPosts()}</div>;
}
