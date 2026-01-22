import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { getSetting } from "@/lib/data";

export async function Footer() {
  const socialLinks = await getSetting<{
    github?: string;
    linkedin?: string;
    twitter?: string;
  }>("social_links");
  const email = await getSetting<string>("email");

  const links = [
    { href: socialLinks?.github, icon: Github, label: "GitHub" },
    { href: socialLinks?.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: socialLinks?.twitter, icon: Twitter, label: "Twitter" },
    { href: email ? `mailto:${email}` : undefined, icon: Mail, label: "Email" },
  ].filter((link) => link.href);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {links.map((social) => (
              <Link
                key={social.label}
                href={social.href!}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
                target={social.label === "Email" ? "_self" : "_blank"}
                rel={social.label === "Email" ? undefined : "noopener noreferrer"}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
