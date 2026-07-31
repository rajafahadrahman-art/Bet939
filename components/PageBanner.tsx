import Image from "next/image";

export default function PageBanner({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="page-banner">
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        sizes="(max-width: 1120px) 100vw, 1120px"
        priority={priority}
      />
    </div>
  );
}
