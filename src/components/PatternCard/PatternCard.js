import "@/app/page.module.css";
import { getPattern } from "@/lib/patternAPI";
import thumbnail from "@/lib/thumbnail";
import title from "@/lib/title";
import Link from "next/link";
import { useEffect, useState } from "react";
import RenderDropdown from "../RenderDropdown/RenderDropdown";
import styles from "./styles.module.css";

export default function PatternCard({ patternID, list }) {
  const [pattern, setPattern] = useState();

  useEffect(() => {
    async function fetchPatterns() {
      setPattern((await getPattern(patternID))["pattern"]);
    }
    fetchPatterns();
  }, [patternID]);

  return (
    <div className={styles.patternContainer}>
      <div className={styles.patternCard}>
        <h5>{title(pattern)}</h5>
        <Link href={`/pattern/${patternID}`}>
          {thumbnail(pattern, "small_url")}
        </Link>
      </div>
      <div className={styles.dropdown}>
        <RenderDropdown patternID={patternID} list={list} />
      </div>
    </div>
  );
}
