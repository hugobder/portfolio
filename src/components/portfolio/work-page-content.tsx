import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { ProfessionalWorkPage } from "@/lib/db/schema";

interface WorkPageContentProps {
  page: ProfessionalWorkPage;
}

export function WorkPageContent({ page }: WorkPageContentProps) {
  return (
    <div>
      <h2
        className="text-xl font-bold mb-4"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {page.title}
      </h2>

      {page.content && (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-muted-foreground leading-relaxed">
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </div>
      )}

      {page.screenshots && page.screenshots.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Captures d&apos;écran
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {page.screenshots.map((screenshot, i) => (
              <div key={i} className="space-y-1.5">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={screenshot.url}
                    alt={screenshot.caption || `Screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                {screenshot.caption && (
                  <p className="text-xs text-muted-foreground text-center">
                    {screenshot.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {page.codeSnippets && page.codeSnippets.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Extraits de code
          </h3>
          <div className="space-y-4">
            {page.codeSnippets.map((snippet, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border bg-[#1e1e2e]"
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                  <span className="text-sm font-medium text-[#cdd6f4]">
                    {snippet.title}
                  </span>
                  <span className="text-xs text-[#6c7086]">
                    {snippet.language}
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-[#a6adc8] leading-relaxed">
                    {snippet.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
