"use client";

import * as React from "react";
import type { Service } from "@/lib/services";
import Image from "next/image";
import Link from 'next/link'
import { Cloud, Code2, Server, Cpu, Workflow, Database } from "lucide-react";
import { Button } from './ui/button';

interface ServicesProps {
  services: Service[];
}

// Map icons based on service type or category
const getServiceIcon = (serviceType: string) => {
  switch (serviceType.toLowerCase()) {
    case "consulting":
      return <Cpu className="h-8 w-8" />;
    case "implementation":
      return <Server className="h-8 w-8" />;
    case "development":
      return <Code2 className="h-8 w-8" />;
    case "automation":
      return <Workflow className="h-8 w-8" />;
    case "devops":
      return <Cloud className="h-8 w-8" />;
    case "database":
      return <Database className="h-8 w-8" />;
    default:
      return <Cpu className="h-8 w-8" />;
  }
};

export function Services({ services }: ServicesProps) {
  const [randomServices, setRandomServices] = React.useState<Service[]>([]);

  // Shuffle and pick 2 random services on initial render
  React.useEffect(() => {
    if (services.length > 0) {
      const shuffled = [...services]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setRandomServices(shuffled);
    }
  }, [services]);

  return (
    <section id="services" className="py-15 md:py-16 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Areas of Expertise
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Professional DevOps, Cloud, and Full-Stack development services to accelerate your digital transformation
          </p>
          {/* Category pills removed from here */}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            {randomServices.map((service, index) => (
              <div
                key={service.slug}
                className="group relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300"
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {getServiceIcon(service.serviceType)}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {service.serviceType}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>

                  {/* Show features if available */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Duration info */}
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="font-medium">{service.duration}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="relative w-full lg:aspect-auto lg:h-full min-h-[400px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black">
              {/* Use service-related image or fallback */}
              {randomServices[0]?.image ? (
                <Image
                  src={randomServices[0].image}
                  alt={randomServices[0].title}
                  fill
                  className="object-cover opacity-80"
                />
              ) : (
                <Image
                  src="https://picsum.photos/800/600?grayscale"
                  alt="Service showcase"
                  fill
                  className="object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Expert Services</h3>
                <p className="text-gray-300">
                  Randomly selected from my portfolio of {services.length} professional services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Services link */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-full px-8">
            <Link href='/blog'>View all services →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}