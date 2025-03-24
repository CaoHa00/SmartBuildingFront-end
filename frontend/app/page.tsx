import {
  Calendar,
  CloudSun,
  MoveUp,
  Receipt,
  Zap,
  Droplet,
  Ear,
  Square,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SuggestionCarousel } from "./components/suggestions-carousel";

const Navbar = () => (
  <nav className="absolute w-full z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon/logo-15yrs.svg"
            alt="EIU Logo"
            width={120}
            height={120}
          />
        </Link>
        <h1 className="text-5xl text-white font-bold">BLOCK B8</h1>
        <Image src="/icon/iic-logo.svg" alt="EIU Logo" width={50} height={50} />
        {/* <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-blue-900 hover:text-blue-700">
            Home
          </Link>
          <a href="#features" className="text-blue-900 hover:text-blue-700">
            Features
          </a>
          <a href="/dashboard" className="text-blue-900 hover:text-blue-700">
            Demo
          </a>
          <a href="#contact" className="text-blue-900 hover:text-blue-700">
            Contact
          </a>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div> */}
      </div>
    </div>
  </nav>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-full flex justify-center bg-gradient-to-b from-blue-900 via-indigo-600 to-violet-700">
        <div className="container mx-auto px-6 text-white">
          <SuggestionCarousel />
          {/* <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
              Schedule a Tour
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Anniversary Events
            </button>
          </div> */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="row-span-2 bg-muted/40 rounded-xl aspect-auto p-5 mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-xl leading-none">Thu Dau Mot</p>
                  <p className="text-xl leading-none">
                    Friday, March 21st, 2025
                  </p>
                </div>
                <button className="bg-muted/35 rounded-xl p-1 hover:bg-muted/60">
                  <Calendar size={30} />
                </button>
              </div>
              <div className="flex justify-between md:justify-around">
                <div className="text-[80px] md:text-[150px]">34°</div>
                <CloudSun size={100} className="md:w-[180px] md:h-[180px]" />
              </div>
              <div className="text-2xl italic md:text-3xl mb-2">
                27° - 34° Cloudy
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic text-sm md:text-base">UV</p>
                <p className="font-bold text-sm md:text-base">High</p>
                <div className="w-full text-center h-12 md:h-28">Gauge</div>
              </div>
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic text-sm md:text-base">Humidity</p>
                <p className="font-bold text-sm md:text-base">39%</p>
                <div className="w-full text-center h-12 md:h-28">Gauge</div>
              </div>
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic text-sm md:text-base">Temperature</p>
                <p className="font-bold text-sm md:text-base">42°</p>
                <div className="w-full text-center h-12 md:h-28">Gauge</div>
              </div>
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic text-sm md:text-base">Sun</p>
                <p className="font-bold text-sm md:text-base">16:04</p>
                <div className="w-full text-center h-12 md:h-28">Gauge</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 rounded-xl aspect-auto px-5 py-3 mb-4">
              <div className="flex justify-center text-2xl leading-none">
                <Ear />
                Noise Detect
              </div>
              <div className="w-full text-center mt-3 h-36 md:h-40">Gauge</div>
              <div className="flex justify-between">
                <div className="w-full flex border-r border-white pr-2">
                  <div className="w-full">
                    <div className="flex justify-center">
                      <Ear size={10} className="h-4" />
                      <p className="text-xs md:text-base font-bold px-1">
                        Minimum
                      </p>
                      <Square
                        size={8}
                        className="h-4"
                        fill="#02f506"
                        color="#02f506"
                      />
                    </div>
                    <p className="text-xs md:text-base font-bold text-center">
                      32.0 dB
                    </p>
                  </div>
                </div>
                <div className="w-full flex border-r border-white pr-2 pl-2">
                  <div className="w-full">
                    <div className="flex justify-center">
                      <Ear size={10} className="h-4" />
                      <p className="text-xs md:text-base font-bold px-1">
                        Average
                      </p>
                      <Square
                        size={8}
                        className="h-4"
                        fill="yellow"
                        color="yellow"
                      />
                    </div>
                    <p className="text-xs md:text-base font-bold text-center">
                      72.4 dB
                    </p>
                  </div>
                </div>
                <div className="w-full flex pl-2">
                  <div className="w-full">
                    <div className="flex justify-center">
                      <Ear size={10} className="h-4" />
                      <p className="text-xs md:text-base font-bold px-1">
                        Maximum
                      </p>
                      <Square size={8} className="h-4" fill="red" color="red" />
                    </div>
                    <p className="text-xs md:text-base font-bold text-center">
                      81.2 dB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted/40 rounded-xl aspect-auto px-3 py-3 mb-4">
              <div className="flex">
                <Leaf fill="white" />
                <h1 className="text-2xl leading-none ml-2">Air Quality</h1>
              </div>
              <div className="w-full text-center mb-3 h-36 md:h-40">
                <h1 className="text-[100px] leading-none text-[#02f506]">30</h1>
                <h1 className="text-5xl">Fresh</h1>
              </div>
              <div className="flex justify-between">
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">30.6</p>
                  <p className="text-center">PM2.5</p>
                </div>
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">15.2</p>
                  <p className="text-center">PM10</p>
                </div>
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">2.5</p>
                  <p className="text-center">SO2</p>
                </div>
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">6.8</p>
                  <p className="text-center">NO2</p>
                </div>
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">19.7</p>
                  <p className="text-center">O2</p>
                </div>
                <div className="w-full font-bold">
                  <p className="text-center text-[#02f506]">1.9</p>
                  <p className="text-center">CO</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-2 grid grid-flow-col grid-rows-4">
              <div className="row-span-3 bg-muted/40 rounded-xl aspect-auto px-5 py-3 mb-4">
                <p className="md:text-2xl tracking-widest">Usage This Day</p>
              </div>
              <div className="bg-muted/40 flex rounded-xl aspect-auto px-2 md:px-5 py-3 mb-4">
                <div className="w-1/2 relative flex border-r border-white">
                  <Zap fill="white" className="h-16" />
                  <div className="ml-5 pt-1">
                    <p className="md:text-xl">Week Usage</p>
                    <p className="md:text-xl">
                      <span className="font-bold">25,5</span> KwH
                    </p>
                  </div>
                  <div className="absolute right-0 p-1 md:p-3">
                    <MoveUp size={18} className="h-16" color="red" />
                  </div>
                </div>
                <div className="w-1/2 relative flex pl-2 md:pl-5">
                  <Receipt className="h-16" />
                  <div className="ml-5 pt-1">
                    <p className="md:text-xl">Efficiency</p>
                    <p className="md:text-xl">
                      <span className="font-bold">43,5</span> %
                    </p>
                  </div>
                  <div className="absolute right-0 p-1 md:p-3">
                    <MoveUp size={18} className="h-16" color="#02f506" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-2 grid grid-flow-col grid-rows-4">
              <div className="row-span-3 bg-muted/40 rounded-xl aspect-auto px-5 py-3 mb-4">
                <p className="md:text-2xl tracking-widest">Usage This Day</p>
              </div>
              <div className="bg-muted/40 flex rounded-xl aspect-auto px-2 md:px-5 py-3 mb-4">
                <div className="w-1/2 relative flex border-r border-white">
                  <Droplet fill="white" className="h-16" />
                  <div className="ml-5 pt-1">
                    <p className="md:text-xl">Week Usage</p>
                    <p className="md:text-xl">
                      <span className="font-bold">25,5</span> KwH
                    </p>
                  </div>
                  <div className="absolute right-0 p-1 md:p-3">
                    <MoveUp size={18} className="h-16" color="red" />
                  </div>
                </div>
                <div className="w-1/2 relative flex pl-2 md:pl-5">
                  <Receipt className="h-16" />
                  <div className="ml-5 pt-1">
                    <p className="md:text-xl">Efficiency</p>
                    <p className="md:text-xl">
                      <span className="font-bold">43,5</span> %
                    </p>
                  </div>
                  <div className="absolute right-0 p-1 md:p-3">
                    <MoveUp size={18} className="h-16" color="#02f506" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic">UV</p>
                <p className="font-bold">High</p>
                <div className="w-full text-center h-16 md:h-28">Gauge</div>
              </div>
              <div className="bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic">Humidity</p>
                <p className="font-bold">39%</p>
                <div className="w-full text-center h-16 md:h-28">Gauge</div>
              </div>
              <div className="col-span-2 bg-muted/40 rounded-xl aspect-auto p-3 md:p-5">
                <p className="italic">Temperature</p>
                <p className="font-bold">42°</p>
                <div className="w-full text-center h-44 md:h-28">Gauge</div>
              </div>
            </div> */}
          </div>
          <div className="bg-muted/40 rounded-xl aspect-auto px-2 md:px-5 py-3 mb-4"></div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">
            IIC Innovation Features
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Part of EIU's 15th Anniversary Innovation Showcase
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Powered Security"
              description="Advanced facial recognition and IoT-based security systems developed by EIU students"
              icon="🤖"
            />
            <FeatureCard
              title="Green Technology"
              description="Smart energy management with solar integration and waste reduction systems"
              icon="🌱"
            />
            <FeatureCard
              title="Smart Learning"
              description="Interactive spaces with AR/VR capabilities for enhanced educational experiences"
              icon="🎓"
            />
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section
        id="contact"
        className="py-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-white mb-8">Be part of EIU's Innovation Journey</p>
          <p className="mb-4">Email: iic.project@eiu.edu</p>
          <p className="mb-4">Phone: (555) 123-4567</p>
          <p>Location: Block B8, EIU Innovation Campus</p>
        </div>
      </section> */}
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="p-6 rounded-lg bg-white hover:bg-blue-50 hover:shadow-blue-100 shadow-lg transition-all">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-blue-900">{title}</h3>
    <p className="text-blue-800/70">{description}</p>
  </div>
);
