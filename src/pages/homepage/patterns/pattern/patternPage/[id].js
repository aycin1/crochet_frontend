"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PatternPage() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.pattern) {
      setPattern(JSON.parse(router.query.pattern));
      setProperties(setPropertiesFunction(JSON.parse(router.query.pattern)));
    }
  }, [router.query]);

  const [pattern, setPattern] = useState();
  const [properties, setProperties] = useState();

  function setPropertiesFunction(pattern) {
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

  function thumbnail(pattern) {
    if (pattern) {
      if (!pattern.photos || !pattern.photos[0]) return null;
      const photoUrl = Object.values(pattern.photos)[0].medium_url;
      return (
        <div key={pattern.photos.id}>
          <Image
            src={photoUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "auto", width: "30%" }}
            alt={`Image of pattern ${pattern.photos.id}`}
          />
        </div>
      );
    }
  }

  function title(pattern) {
    if (pattern) {
      return (
        <div>
          <h3>{pattern.name}</h3>
        </div>
      );
    }
  }

  if (pattern) {
    return (
      <div className="pattern-page-container">
        <div>{title(pattern)}</div>
        <div>{linkToPattern()}</div>
        <div>{thumbnail(pattern)}</div>
        <div>{pattern.notes}</div>
      </div>
    );
  }
}
