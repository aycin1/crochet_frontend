"use client";

import { useState } from "react";
import Login from "./login/page";
import Register from "./register/page";

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

  function handleClick() {
    setIsRegistered((oldValue) => !oldValue);
  }

  return (
    <div>
      {
        <div className="page">
          {isRegistered ? <Login /> : <Register />}
          <button onClick={handleClick}>
            <div>
              {isRegistered
                ? "I need to make an account"
                : "I've registered before"}
            </div>
          </button>
        </div>
      }
    </div>
  );
}
