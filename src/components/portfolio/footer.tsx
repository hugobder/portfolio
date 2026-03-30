import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { getSetting } from "@/lib/data";

export async function Footer() {
  const socialLinks = await getSetting<{
    github?: string;
    linkedin?: string;
  }>("social_links");
  const email = await getSetting<string>("email");

  const links = [
    { href: socialLinks?.github, icon: Github, label: "GitHub" },
    { href: socialLinks?.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: email ? `mailto:${email}` : undefined, icon: Mail, label: "Email" },
  ].filter((link) => link.href);

  return (
    <footer className="border-t bg-background">
      {/* Colorful gradient top stripe */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--coral) 0%, var(--electric-blue) 50%, var(--sunny-yellow) 100%)",
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-foreground">Hugo<span className="text-primary">.</span></span>
            {" "}Tous droits réservés.
          </p>

          <div className="flex items-center gap-3">
            {links.map((social) => (
              <Link
                key={social.label}
                href={social.href!}
                className="p-2 rounded-full text-muted-foreground hover:text-primary border border-transparent hover:border-border hover:bg-muted transition-all duration-200"
                aria-label={social.label}
                target={social.label === "Email" ? "_self" : "_blank"}
                rel={social.label === "Email" ? undefined : "noopener noreferrer"}
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
