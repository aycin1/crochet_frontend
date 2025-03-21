import Image from "next/image";

export default function thumbnail(pattern, urlSize) {
  if (pattern) {
    if (!pattern.photos || !pattern.photos[0])
      return <p>Image not found, please try again</p>;
    const photoUrl = Object.values(pattern.photos)[0][urlSize];
    return (
      <div key={pattern.photos.id}>
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
    );
  }
}
