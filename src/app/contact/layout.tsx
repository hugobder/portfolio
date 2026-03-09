import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hugo Bruder. Have a project in mind or want to collaborate? Send a message and I'll get back to you as soon as possible.",
  openGraph: {
    title: "Contact | Hugo Bruder",
    description:
      "Get in touch with Hugo Bruder. Have a project in mind or want to collaborate? Send a message and I'll get back to you as soon as possible.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | Hugo Bruder",
    description:
      "Get in touch with Hugo Bruder. Have a project in mind or want to collaborate? Send a message and I'll get back to you as soon as possible.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
