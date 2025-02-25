"use client";
import { useRouter } from "next/router";

export default function Lists({ listsPromise, setChosenList }) {
  const router = useRouter();
  function handleClick(list) {
    setChosenList(list);
    router.push("/homepage/patterns/pattern");
  }
  function setLinks() {
    return listsPromise
      ? Object.keys(listsPromise).map((list, index) => {
          return (
            <div key={index}>
              <button onClick={() => handleClick(list)}>{list}</button>
            </div>
          );
        })
      : console.log("uh-oh");
  }

  return <div>{listsPromise ? setLinks() : <p>Hello</p>}</div>;
}
