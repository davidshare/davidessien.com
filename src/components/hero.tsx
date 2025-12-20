import Image from "next/image";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Facebook } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 lg:pt-32">
      <div className="container px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                I AM DAVID ESSIEN
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">
                Devops/Cloud Engineer
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                with over 15 years of experience in the tech industry. He is also the co-founder of Psifon.org and Tersu (an organization dedicated to the implementation and democratization of practical knowledge).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <Link href={'/documents/David-Essien-CV.pdf'} download>
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <Link href={'https://www.linkedin.com/in/iamdavidshare/'}>
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                  <Link href={'https://web.facebook.com/iamdavidshare'}>
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative aspect-square">
              {/* Background Shapes/Icons */}
              <div className="absolute top-0 left-0 animate-bounce delay-100">
                <div className="text-4xl text-slate-900">
                  <Image
                    src='/images/Amazon-Web-Services-Emblem.png'
                    height={40}
                    width={40}
                    alt='aws logo'
                  />
                </div>
              </div>
              <div className="absolute top-10 right-10 animate-pulse">
                <div className="text-4xl">
                  <Image
                    src='/images/kubernetes-wheels.jpg'
                    height={40}
                    width={40}
                    alt='kubenetes logo'
                  />
                </div>
              </div>
              <div className="absolute bottom-20 left-10 animate-pulse delay-75">
                <div className="text-4xl">
                  <Image
                    src='/images/docker-logo.jpg'
                    height={40}
                    width={40}
                    alt='kubenetes logo'
                  />
                </div>
              </div>

              {/* Main Image Container */}
              <div className="rounded-full overflow-hidden border-8 border-muted/20 bg-muted/10 w-full h-full relative z-10">
                <Image
                  src="/images/david-essien.jpg"
                  alt="David Essien"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="mt-24 rounded-2xl bg-[#1A1A1A] p-8 md:p-12">
          <div className="flex flex-wrap justify-around items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="text-2xl text-white font-bold flex items-center gap-2">Google</h3>
            <h3 className="text-2xl text-white font-bold flex items-center gap-2">
              <Link href={'https://web.facebook.com/iamdavidshare'}>
                facebook
              </Link>
            </h3>
            <h3 className="text-2xl text-white font-bold flex items-center gap-2">YouTube</h3>
            <h3 className="text-2xl text-white font-bold flex items-center gap-2">Pinterest</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
