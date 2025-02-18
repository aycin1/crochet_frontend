"use client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState(new FormData());
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  async function registerUser() {
    const request = await fetch("http://localhost:2501/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    });
    if (request.ok)
      setMessage("Registration successful, navigating to log in page");
    const statusCode = request.status;
    const response = await request.json();
    return { response, statusCode };
  }

  async function handleSubmit() {
    const result = await registerUser();
    if (result.response.message) setResponseMessage(result.response.message);
    if (result.statusCode === 201) router.push("/login");
  }

  function handleChange(e) {
    setRegisterForm((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Form action={handleSubmit}>
      <h1>Registration</h1>
      <label>
        First name
        <input name="first_name" type="string" onChange={handleChange}></input>
      </label>
      <label>
        Last name
        <input name="last_name" type="string" onChange={handleChange}></input>
      </label>
      <label>
        Email address
        <input name="email" type="string" onChange={handleChange}></input>
      </label>
      <label>
        Username
        <input name="username" type="string" onChange={handleChange}></input>
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={handleChange}></input>
      </label>
      <label>
        Confirm password
        <input
          name="passwordConfirm"
          type="password"
          onChange={(e) => {
            handleChange(e);
            e.target.value === registerForm.password
              ? setError(false)
              : setError("Passwords do not match");
          }}
        ></input>
      </label>
      <button type="submit">Register me</button>
      {error ? <div>{error}</div> : null}
      {message ? <div>{message}</div> : null}
      {responseMessage ? <div>{responseMessage}</div> : null}
    </Form>
  );
}
