"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface Screenshot {
  url: string;
  caption?: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  const activeScreenshot =
    activeIndex !== null ? screenshots[activeIndex] : null;

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Captures d&apos;écran
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {screenshots.map((screenshot, i) => (
          <div key={i} className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-video w-full overflow-hidden rounded-lg bg-muted cursor-zoom-in transition-transform hover:scale-[1.02]"
              aria-label={
                screenshot.caption
                  ? `Agrandir : ${screenshot.caption}`
                  : `Agrandir la capture d'écran ${i + 1}`
              }
            >
              <Image
                src={screenshot.url}
                alt={screenshot.caption || `Screenshot ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
            {screenshot.caption && (
              <p className="text-xs text-muted-foreground text-center">
                {screenshot.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent className="max-w-none w-fit p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">
            {activeScreenshot?.caption || "Capture d'écran agrandie"}
          </DialogTitle>
          {activeScreenshot && (
            <Image
              src={activeScreenshot.url}
              alt={activeScreenshot.caption || "Screenshot"}
              width={1920}
              height={1080}
              sizes="90vw"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
