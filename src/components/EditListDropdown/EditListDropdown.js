"use client";
import Dropdown from "react-dropdown";

export default function EditListDropdown({ list, options, handleChange }) {
  function editDropdownOptions() {
    let newArr = [];
    for (let option of options) {
      if (option !== list) newArr.push(option);
    }
    newArr.push("remove");
    return newArr;
  }
  const newOptionsArr = editDropdownOptions();

  return (
    <div>
      <Dropdown
        options={newOptionsArr}
        placeholder="Change list..."
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
