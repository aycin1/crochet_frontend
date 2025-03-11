export async function getLists() {
  try {
    const response = await fetch(`http://localhost:2501/home`, {
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
