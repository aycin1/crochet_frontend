"use client";

export default function ListButtons({ title, setChosenList }) {
  function handleClick(e) {
    setChosenList(e.target.name);
  }

  return (
    <div>
      <button name={title} onClick={(e) => handleClick(e)}>
        {title}
      </button>
    </div>
  );
}
