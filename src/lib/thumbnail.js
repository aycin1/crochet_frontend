import Image from "next/image";
import Link from "next/link";

export default function thumbnail(
  pattern,
  urlSize,
  style,
  maxHeight,
  withLink
) {
  if (pattern) {
    if (!pattern.photos || !pattern.photos[0])
      return <p>Image not found, please try again</p>;
    const photoUrl = Object.values(pattern.photos)[0][urlSize];
    function image() {
      return (
        <Image
          src={photoUrl}
          key={pattern.photos.id}
          style={style}
          width={0}
          height={0}
          sizes="100vw"
          alt={`Image of pattern ${pattern.photos.id}`}
        />
      );
    }
    if (withLink) {
      return (
        <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>
          <Link href={`/pattern/${pattern.pattern_id || pattern.id}`}>
            {image()}
          </Link>
        </div>
      );
    } else {
      return (
        <div style={{ maxHeight: maxHeight, overflow: "hidden" }}>
          {image()}
        </div>
      );
    }
  }
}
