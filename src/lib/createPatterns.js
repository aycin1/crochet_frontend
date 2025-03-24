import PatternCard from "@/components/PatternCard/PatternCard";
import styles from "./styles.module.css";

export function createPatterns(patterns, thumbnailOptions, list) {
  if (patterns) {
    return patterns.map((pattern) => {
      const patternID = pattern.pattern_id || pattern.id;
      return (
        <div key={patternID} className={styles.patternCardContainer}>
          <PatternCard
            patternID={patternID}
            list={list}
            thumbnailOptions={thumbnailOptions}
          />
        </div>
      );
    });
  }
}
