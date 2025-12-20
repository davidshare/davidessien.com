"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Briefcase, GraduationCap, Award, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Experience } from "@/lib/api";

interface ExperienceProps {
  items: Experience[];
}

const TABS = [
  { id: "Skills", label: "Skills", icon: <Cpu className="w-4 h-4" /> },
  { id: "Experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { id: "Education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "Certification", label: "Certifications", icon: <Award className="w-4 h-4" /> },
];

export function ExperienceSection({ items }: ExperienceProps) {
  const [activeTab, setActiveTab] = React.useState("Experience");

  const filteredItems = items.filter((item) => item.type === activeTab).sort((a, b) => a.period < b.period ? 1 : -1);
  const displayedItems = filteredItems.slice(0, 4);
  const hasMore = filteredItems.length > 4;

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/20">
      <div className="container px-4 md:px-8">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              My Work Details
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="max-w-md text-muted-foreground md:text-right">
              I bring hands-on experience across DevOps, cloud infrastructure, and full-stack development to help teams ship software that is stable, secure, and maintainable.
            </p>
            <Button asChild className="w-fit rounded-full" variant="outline">
              <Link href={'/documents/David-Essien-CV.pdf'} download>
                Download CV <Download className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Tabs */}
          <div className="flex flex-col gap-2 min-w-50 self-start">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all text-left cursor-pointer ${activeTab === tab.id
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-background text-muted-foreground hover:bg-background/80 border"
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-background rounded-3xl p-8 border min-h-[400px]">
            {filteredItems.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No information available for this section yet.
              </div>
            ) : (
              <div className="space-y-8">
                {displayedItems.map((item) => (
                  <div key={item.slug} className="group relative border-b last:border-0 pb-8 last:pb-0">
                    {item.type === "Experience" && (
                      <Link
                        href={`/experience/${item.slug}`}
                        className="absolute inset-0 z-10"
                        aria-label={`View ${item.title}`}
                      />
                    )}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                          <span className="font-medium text-primary">{item.company}</span>
                          {item.location && <span>• {item.location}</span>}
                        </div>
                        <div className="text-muted-foreground text-sm max-w-xl">
                          {item.type != "Skills" && item.description}
                        </div>
                        {item.skills && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.skills.map(s => (
                              <span key={s} className="text-xs bg-secondary px-2 py-1 rounded-md">{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-medium whitespace-nowrap bg-secondary/50 px-3 py-1 rounded-md h-fit">
                        {(item.period ?? item.duration?.label) ?? ""}
                      </div>
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div className="pt-8 mt-auto">
                    <Link href={`/${activeTab.toLowerCase()}`}>
                      <Button
                        variant="outline"
                        className="w-fit rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background flex items-center gap-2"
                      >
                        {TABS.find(tab => tab.id === activeTab)?.icon}
                        {`View all my ${activeTab}`}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
