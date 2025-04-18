import Image from "next/image";
export default function BackgroundLayer() {
    return (
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/BG.svg"
          alt="background"
          fill
          priority
          quality={70}
          className="object-cover"
        />
      </div>
    );
  }