import PatternCard from "@/components/PatternCard/PatternCard";
import RenderDropdown from "@/components/RenderDropdown/RenderDropdown";
import styles from "./styles.module.css";

export function createPatterns(patterns, list) {
  if (patterns) {
    return patterns.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className={styles.patternCardContainer}>
          <div className={styles.patternCard}>
            <PatternCard patternID={patternID} list={list} />
          </div>
        </div>
      );
    });
  }
}
