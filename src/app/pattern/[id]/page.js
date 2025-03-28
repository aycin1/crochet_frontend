"use server";
import { getPattern } from "@/lib/patternAPI";
import thumbnail from "@/lib/thumbnail";
import title from "@/lib/title";
import styles from "./styles.module.css";
export default async function PatternPage({ params }) {
  const patternID = await params;
  const pattern = (await getPattern(patternID.id)).pattern;

  function setProperties(pattern) {
    return {
      name: pattern.name,
      notes: pattern.notes,
      craft: pattern.craft.name,
      needleSizes: pattern.pattern_needle_sizes[0],
      currency: pattern.currency,
      price: pattern.price,
      patternType: pattern.pattern_type.name,
      yardage: pattern.yardage,
      gauge: pattern.gauge_description,
      category: pattern.pattern_categories,
      weight: pattern.yarn_weight_description,
      author: pattern.pattern_author.name,
    };
  }

  const properties = setProperties(pattern);

  function setPatternUrl() {
    return pattern.url === "" && pattern.printings[0].pattern_source.url !== ""
      ? (properties.url = pattern.printings[0].pattern_source.url)
      : pattern.url === "" && pattern.printings[0].pattern_source.url === ""
      ? (properties.source = {
          name: pattern.printings[0].pattern_source.name,
          type: pattern.printings[0].pattern_source.pattern_source_type
            .long_name,
        })
      : (properties.url = pattern.url);
  }

  function linkToPattern() {
    setPatternUrl();
    if (properties.url) {
      return (
        <div className="pattern-link">
          <a href={properties.url}>Pattern</a> by {properties.author}
        </div>
      );
    } else {
      return (
        <div className="pattern-source-details">
          {properties.source?.name} ({properties.source?.type.toLowerCase()}) by{" "}
          {properties.author}
        </div>
      );
    }
  }
  const thumbnailOptions = {
    url: "medium2_url",
    style: {
      width: "100%",
      height: "auto",
      maxWidth: "400px",
      minWidth: "400px",
    },
    maxHeight: "none",
    withLink: false,
  };

  if (pattern) {
    return (
      <div>
        <h3>{title(pattern)}</h3>
        <div>{linkToPattern()}</div>
        <div className={styles.container}>
          <div>{pattern.notes}</div>
          <div>
            {thumbnail(
              pattern,
              thumbnailOptions.url,
              thumbnailOptions.style,
              thumbnailOptions.maxHeight,
              thumbnailOptions.withLink
            )}
          </div>
        </div>
      </div>
    );
  }
}
