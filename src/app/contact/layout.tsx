import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Hugo Bruder. Vous avez un projet en tête ou souhaitez collaborer ? Envoyez un message et je vous répondrai dans les plus brefs délais.",
  openGraph: {
    title: "Contact | Hugo Bruder",
    description:
      "Contactez Hugo Bruder. Vous avez un projet en tête ou souhaitez collaborer ? Envoyez un message et je vous répondrai dans les plus brefs délais.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
