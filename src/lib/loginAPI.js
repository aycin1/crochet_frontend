export async function logUserIn(credentials) {
  try {
    const response = await fetch("http://localhost:2501/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error during fetch:", error);
  }
}

export async function logUserOut() {
  try {
    const response = await fetch("http://localhost:2501/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.status;
  } catch (error) {
    console.log("Error during fetch:", error);
  }
}
