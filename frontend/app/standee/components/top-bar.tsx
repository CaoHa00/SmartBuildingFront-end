import Image from "next/image";

export default function TopBar() {
    return (
        <nav className="absolute w-full z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-center">
                    <Image
                        className="bg-white rounded-xl p-3 md:w-[200px] md:h-[60px]"
                        src="/icon/new-15year-logo.svg"
                        alt="EIU Logo"
                        width={150}
                        height={180}
                    />
                    <h1 className="text-4xl md:text-5xl text-white font-bold mx-12 md:mx-72">BLOCK B8</h1>
                    <Image
                        className="bg-white rounded-xl px-3 py-2 md:w-[200px] md:h-[60px]" 
                        src="/icon/powerd-by-IIC-logo.svg" 
                        alt="Powered by IIC Logo" 
                        width={150} 
                        height={150}
                    />
                </div>
            </div>
        </nav>
    )
}