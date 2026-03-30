"use client";

import { Download } from "lucide-react";

export function CvDownloadButton() {
  return (
    <a
      href="/cv.pdf"
      download
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:scale-105"
      style={{ borderColor: "var(--electric-blue)", color: "var(--electric-blue)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--electric-blue)";
        (e.currentTarget as HTMLElement).style.color = "white";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = "var(--electric-blue)";
      }}
    >
      <Download className="h-4 w-4" />
      Télécharger mon CV
    </a>
  );
}
