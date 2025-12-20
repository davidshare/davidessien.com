"use client";

import * as React from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, Twitter, Mail, Linkedin, Globe, Instagram } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, children, mobile = false, onClick }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      mobile ? "block py-3 text-lg" : "text-muted-foreground"
    )}
  >
    {children}
  </Link>
);

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-primary/5 dark:bg-black/40 border-b py-2 px-4 md:px-8 text-xs flex justify-between items-center text-muted-foreground">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Twitter size={12} /> +234 816 746 2431</span>
          <span className="flex items-center gap-1"><Mail size={12} />  davidessienshare@gmail.com</span>
        </div>
        <div className="flex gap-3">
          <Linkedin size={14} className="hover:text-foreground cursor-pointer" />
          <Twitter size={14} className="hover:text-foreground cursor-pointer" />
          <Globe size={14} className="hover:text-foreground cursor-pointer" />
          <Instagram size={14} className="hover:text-foreground cursor-pointer" />
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">❖</span> David Essien
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/testimonials">Testimonials</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <Button variant="default" size="sm" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
              Hire Me
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden border-b bg-background p-4">
            <nav className="flex flex-col space-y-2">
              <NavLink href="/services" mobile onClick={() => setIsOpen(false)}>Services</NavLink>
              <NavLink href="#works" mobile onClick={() => setIsOpen(false)}>Works</NavLink>
              <NavLink href="#about" mobile onClick={() => setIsOpen(false)}>About</NavLink>
              <NavLink href="#testimonials" mobile onClick={() => setIsOpen(false)}>Testimonials</NavLink>
              <NavLink href="#blog" mobile onClick={() => setIsOpen(false)}>Blog</NavLink>
              <Button className="w-full mt-4">Hire Me</Button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}