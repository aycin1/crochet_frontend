"use client";
import Form from "next/form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState(new FormData());
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function logUserIn(credentials) {
    const request = await fetch("http://localhost:2501/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (request.ok) setMessage("Login successful, navigating to homepage");
    else {
      setError(`Error ${request.status}:${request.statusText}`);
    }
    const statusCode = request.status;
    const response = await request.json();
    return { response, statusCode };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await logUserIn(credentials);
    if (result.response.message) setResponseMessage(result.response.message);
    if (result.response.accessToken) {
      window.localStorage.setItem("accessToken", result.response.accessToken);
    }
    if (result.statusCode === 201) {
      router.push(`/homepage`);
    }
  }

  function handleChange(e) {
    setCredentials((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1>Login</h1>
      <label>
        Username
        <input
          name="username"
          type="string"
          onChange={(e) => handleChange(e)}
        ></input>
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          onChange={(e) => handleChange(e)}
        ></input>
      </label>
      <button type="submit">Log in</button>
      {error ? <div>{error}</div> : null}
      {message ? <div>{message}</div> : null}
      {responseMessage ? <div>{responseMessage}</div> : null}
    </Form>
  );
}
