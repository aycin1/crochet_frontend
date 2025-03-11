"use server";
import "./../../../page.module.css";
// app/page.module.css";
import { getPattern } from "@/lib/patternAPI";

export default async function Pattern() {
  // "Rendering" needs to be changed to the loading pattern cards
  return (
    <div>
      {/* <div>{patternAPI ? renderPatternCard() : <p>Rendering...</p>}</div> */}
    </div>
  );
}
