"use server";
// import DisplayLists from "@/components/DisplayLists";
import Lists from "./lists/page";

export default async function Homepage() {
  return (
    <div>
      <Lists

      // lists={lists} setLists={setLists}
      // setChosenList={setChosenList}
      />
      {/* {patternIDs && chosenList ? (
        <Patterns patternIDs={patternIDs} lists={lists}></Patterns>
      ) : (
        "Select a list"
      )} */}
    </div>
  );
}
