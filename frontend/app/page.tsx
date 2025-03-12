import Image from "next/image";
import Link from "next/link";

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
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
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-blue-900 hover:text-blue-700">Home</Link>
          <a href="#features" className="text-blue-900 hover:text-blue-700">Features</a>
          <a href="#contact" className="text-blue-900 hover:text-blue-700">Contact</a>
          <Link 
            href="/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">IIC Smart Building Project</h1>
          <p className="text-2xl mb-4">Celebrating EIU's 15th Anniversary</p>
          <p className="text-xl mb-8">Innovation in Intelligent Construction - Block B8</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors">
              Schedule a Tour
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Anniversary Events
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">IIC Innovation Features</h2>
          <p className="text-center text-gray-600 mb-12">Part of EIU's 15th Anniversary Innovation Showcase</p>
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="text-white mb-8">Be part of EIU's Innovation Journey</p>
          <p className="mb-4">Email: iic.project@eiu.edu</p>
          <p className="mb-4">Phone: (555) 123-4567</p>
          <p>Location: Block B8, EIU Innovation Campus</p>
        </div>
      </section>
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
