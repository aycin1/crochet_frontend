"use client";
import { logUserIn } from "@/lib/loginAPI";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  // const [error, setError] = useState(false);
  // const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await logUserIn(credentials);

    if (response?.message.includes("successful")) {
      router.push(`/`);
    }
  }

  function handleChange(e) {
    setCredentials((values) => {
      const updatedCredentials = { ...values, [e.target.name]: e.target.value };
      return updatedCredentials;
    });
  }

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
      </Form>
      {/* {error ? <div>{error}</div> : null}
      {message ? <div>{message}</div> : null} */}
    </div>
  );
}
