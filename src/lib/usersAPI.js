export async function searchUsers(username) {
  try {
    const response = await fetch(`http://localhost:2501/users/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function getPostsForUser(username) {
  try {
    const response = await fetch(
      `http://localhost:2501/users/profile/${username}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function isFollowing(searchedUser) {
  try {
    const response = await fetch(
      `http://localhost:2501/users/isFollowing/${searchedUser}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 200) return true;
    else if (response.status === 204) return false;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function followUser(searchedUser) {
  try {
    const response = await fetch(`http://localhost:2501/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(searchedUser),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function unfollowUser(searchedUser) {
  try {
    const response = await fetch(`http://localhost:2501/users`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(searchedUser),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getFollowers() {
  try {
    const response = await fetch(`http://localhost:2501/users/user/followers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const { followers } = await response.json();
    if (followers === false) return 0;
    else {
      return followers;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function getFollowing() {
  try {
    const response = await fetch(`http://localhost:2501/users/user/following`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const { following } = await response.json();
    if (following === false) return 0;
    else {
      return following;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
