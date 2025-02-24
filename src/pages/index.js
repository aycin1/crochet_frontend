"use client";
import { useState } from "react";
import Header from "./header";
import Login from "./login";
import Register from "./register";

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);

  function handleClick() {
    setIsRegistered((oldValue) => !oldValue);
  }

  return (
    <div>
      <Header />
      <h1>Fibre fantasies</h1>
      <div>
        {isRegistered ? <Login /> : <Register />}
        <button onClick={handleClick}>
          <div>
            {isRegistered
              ? "I need to make an account"
              : "I've registered before"}
          </div>
        </button>
      </div>
    </div>
  );
}
