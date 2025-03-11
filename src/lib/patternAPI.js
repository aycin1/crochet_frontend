export async function getPattern(patternID) {
  let res;
  try {
    const response = await fetch(
      `http://localhost:2501/patterns/filter/${patternID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    res = { response: null, statusCode: 500 };
  }
  return res;
}

export async function getRandomPatterns() {
  let res;
  try {
    const request = await fetch(`http://localhost:2501/patterns/randomiser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await request.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    res = null;
  }
  return res;
}

export async function searchPatterns(searchField) {
  let url = "http://localhost:2501/patterns/refine/";
  if (searchField) url += `query=${searchField}`;

  let res;
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    res = await request.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    res = null;
  }
  return res;
}
