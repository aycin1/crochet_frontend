"use client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(new FormData());
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (username) localStorage.setItem("username", username);
  }, [username]);

  async function logUserIn() {
    const request = await fetch("http://localhost:2501/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });
    if (request.ok) setMessage("Login successful, navigating to homepage");
    const statusCode = request.status;
    const response = await request.json();
    return { response, statusCode };
  }

  async function handleSubmit() {
    const result = await logUserIn();
    if (result.response.message) setResponseMessage(result.response.message);
    if (result.statusCode === 201) router.push("/homepage");
  }

  function handleChange(e) {
    setLoginForm((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Form action={handleSubmit}>
      <h1>Login</h1>
      <label>
        Username
        <input
          name="username"
          type="string"
          onChange={(e) => {
            handleChange(e);
            setUsername(e.target.value);
          }}
        ></input>
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={handleChange}></input>
      </label>
      <button type="submit">Log in</button>
      {error ? <div>{error}</div> : null}
      {message ? <div>{message}</div> : null}
      {responseMessage ? <div>{responseMessage}</div> : null}
    </Form>
  );
}
