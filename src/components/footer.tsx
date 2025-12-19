import Link from "next/link";
import { Github, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white border-t border-white/10 py-16">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">❖</span> David Essien
              </span>
            </Link>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="#works" className="hover:text-white">Works</Link></li>
              <li><Link href="#about" className="hover:text-white">About</Link></li>
              <li><Link href="#testimonials" className="hover:text-white">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow me on</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white">Facebook</Link></li>
              <li><Link href="#" className="hover:text-white">Linkedin</Link></li>
              <li><Link href="#" className="hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white">Medium</Link></li>
              <li><Link href="#" className="hover:text-white">Github</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
