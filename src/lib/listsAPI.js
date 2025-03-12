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

export async function editList(method, listEdit, setError, setMessage) {
  let res;
  try {
    const request = await fetch(`http://localhost:2501/home/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listEdit),
      credentials: "include",
    });
    if (request.ok) {
      const response = await request.json();
      setMessage(response.message);
      return response;
    } else {
      setError(`Error ${request.status}:${request.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res = { response: null, statusCode: 500 };
  }
  return res;
}
