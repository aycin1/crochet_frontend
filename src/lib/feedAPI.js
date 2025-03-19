export async function getPostsForFeed() {
  try {
    const response = await fetch(`http://localhost:2501/feed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) console.log("Error:", response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getLikes(postID) {
  try {
    const response = await fetch(`http://localhost:2501/likes/${postID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) console.log("Error:", response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function isAlreadyLiked(postID) {
  try {
    const response = await fetch(`http://localhost:2501/likes/user/${postID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) return true;
    else if (response.status === 204) return false;
  } catch (error) {
    console.log(error);
  }
}

export async function addOrRemoveLike(postID, method) {
  try {
    const response = await fetch(`http://localhost:2501/likes`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ post_id: postID }),
    });

    if (!response.ok) console.log("Error:", response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
