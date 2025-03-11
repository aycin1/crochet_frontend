import PatternCard from "@/components/PatternCard/PatternCard";

export function createPatterns(patterns) {
  if (patterns) {
    return patterns.map((pattern) => {
      return (
        <div key={pattern.pattern_id}>
          <PatternCard patternID={pattern.pattern_id}></PatternCard>
        </div>
      );
    });
  }
}
