"use client";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
export default function AddToListDropdown({ options, handleChange }) {
  return (
    <div>
      <Dropdown
        options={options}
        placeholder="Add to list..."
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
