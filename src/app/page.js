"use client";
import React from "react";
import Header from "./header/page";
import Login from "./login/page";
import Register from "./register/page";

export default function Home() {
  const [isRegistered, setIsRegistered] = React.useState(false);

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
