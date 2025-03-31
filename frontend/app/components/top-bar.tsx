import Image from "next/image";

export default function TopBar() {
  return (
    <nav className="absolute w-full z-50">
      <div className="relative container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-center">
          <Image
            className="relative bg-white rounded-xl p-3 md:w-[200px] md:h-[60px]"
            src="/icon/new-15year-logo.svg"
            alt="EIU Logo"
            width={170}
            height={180}
          />
          <h1 className="relative text-4xl md:text-5xl text-white font-bold mx-[93px] md:mx-72">
            BLOCK 8
          </h1>
          <Image
            className="relative bg-white rounded-xl px-3 py-2 md:w-[200px] md:h-[60px]"
            src="/icon/powerd-by-IIC-logo.svg"
            alt="Powered by IIC Logo"
            width={150}
            height={150}
          />
        </div>
      </div>
    </nav>
  );
}
