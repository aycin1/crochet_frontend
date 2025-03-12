"use client";
import Dropdown from "react-dropdown";

export default function EditListDropdown({ patternID, list }) {
  const options = ["wishlist", "wip", "completed"];

  function handleChange(e) {}

  return (
    <div>
      <Dropdown
        options={options}
        placeholder={list}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
