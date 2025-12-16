import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section className="bg-[#1C1C1C] text-white py-20 md:py-32">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h2>
            <p className="text-gray-400 max-w-md">
              Our team would love to hear from you!
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-400">hello@deupload.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-gray-400">+1 415 800-3128</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-3xl p-8 text-black">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Vitalik Buterin"
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="vitalik@company.com"
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                  Phone number (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 415 800-1287"
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Hi there, I would like to..."
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-black resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-black/80 rounded-full px-6">
                  Send Message <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
