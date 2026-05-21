"use client";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  /** Pre-highlighted HTML (already escaped). Falls back to plain code. */
  highlighted?: string;
}

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CodeBlock = ({ code, language, filename, highlighted }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative group">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#150828] border border-b-0 border-white/5 rounded-t-[14px] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            {filename && <span className="text-purple-200/70 ml-2 font-mono">{filename}</span>}
          </div>
          {language && (
            <span className="text-pink-300/70 font-mono uppercase tracking-wider text-[10px]">
              {language}
            </span>
          )}
        </div>
      )}
      <div className={`code-block ${filename || language ? "rounded-t-none" : ""}`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-100 text-xs font-medium transition opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
        {highlighted ? (
          <pre className="relative z-[1]" dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <pre className="relative z-[1]">{code}</pre>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
