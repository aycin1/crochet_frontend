"use client";
import Header from "@/components/Header/Header";
import { makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // useEffect(() => {
  //   if (storeRef.current != undefined) {
  //     const unsubscribe = setupListeners(storeRef.current.dispatch);
  //     return unsubscribe;
  //   }
  // }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
