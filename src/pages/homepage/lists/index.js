export default function Lists({ listsPromise, setChosenList }) {
  function setLinks() {
    return listsPromise
      ? Object.keys(listsPromise).map((list, index) => {
          return (
            <div key={index}>
              <button onClick={() => setChosenList(list)}>{list}</button>
            </div>
          );
        })
      : console.log("uh-oh");
  }

  return <div>{listsPromise ? setLinks() : <p>Hello</p>}</div>;
}
