import "@/app/page.module.css";
import { getPattern } from "@/lib/patternAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function PatternCard({ chosenList, patternID }) {
  const [pattern, setPattern] = useState();

  useEffect(() => {
    async function fetchPatterns() {
      setPattern((await getPattern(patternID))["pattern"]);
    }
    fetchPatterns();
  }, [patternID]);

  function thumbnail() {
    if (pattern) {
      if (!pattern.photos || !pattern.photos[0])
        return <p>Image not found, please try again</p>;
      const photoUrl = Object.values(pattern.photos)[0].small_url;
      return (
        <Link href={`/homepage/pattern/${patternID}`}>
          <div key={pattern.photos.id} className={styles.patternPhoto}>
            <Image
              src={photoUrl}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              alt={`Image of pattern ${pattern.photos.id}`}
            />
          </div>
        </Link>
      );
    }
  }

  function title() {
    if (pattern) {
      return pattern.name;
    }
  }

  return (
    <div>
      <h5>{title()}</h5>
      {thumbnail()}
    </div>
  );
}
