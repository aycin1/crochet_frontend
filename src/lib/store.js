import { configureStore } from "@reduxjs/toolkit";

function reducer(state = { username: "", accessToken: "" }, action) {
  switch (action.type) {
    case "setUsername": {
      return { ...state, username: action.payload };
    }
    case "setAccessToken": {
      return { ...state, accessToken: action.payload };
    }
    default:
      return state;
  }
}

export const makeStore = () => {
  return configureStore({
    reducer: reducer,
  });
};
