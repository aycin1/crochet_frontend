import AddToListDropdown from "@/components/AddToListDropdown/AddToListDropdown";
import EditListDropdown from "@/components/EditListDropdown/EditListDropdown";
import PatternCard from "@/components/PatternCard/PatternCard";
import styles from "./styles.module.css";

function editOrAddToList(patternID, origin, list) {
  if (origin === "search") {
    return (
      <div className={styles.dropdown}>
        <AddToListDropdown key={patternID} patternID={patternID} />
      </div>
    );
  } else if (origin === "lists") {
    return (
      <div className={styles.dropdown}>
        <EditListDropdown key={patternID} patternID={patternID} list={list} />
      </div>
    );
  }
}

export function createPatterns(patterns, origin, list) {
  if (patterns) {
    return patterns.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className={styles.patternCardContainer}>
          <div className={styles.patternCard}>
            <PatternCard patternID={patternID} />
          </div>
          {editOrAddToList(patternID, origin, list)}
        </div>
      );
    });
  }
}
