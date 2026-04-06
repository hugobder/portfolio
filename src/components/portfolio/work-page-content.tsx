import ReactMarkdown from "react-markdown";
import { ScreenshotGallery } from "./screenshot-gallery";
import type { ProfessionalWorkPage } from "@/lib/db/schema";

interface WorkPageContentProps {
  page: ProfessionalWorkPage;
}

export function WorkPageContent({ page }: WorkPageContentProps) {
  return (
    <div className="bg-muted rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.05),_0_16px_40px_rgba(0,0,0,0.10)] p-8 md:p-10">
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
        <ScreenshotGallery screenshots={page.screenshots} />
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
