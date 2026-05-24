"use client";
import { useEffect, useState } from "react";
import ExtensionMockup from "./ExtensionMockup";

type SupportedBrowser = "Chrome" | "Edge" | "Brave" | "Opera";

const detectBrowser = async (): Promise<SupportedBrowser> => {
  if (typeof navigator === "undefined") return "Chrome";
  const ua = navigator.userAgent;

  try {
    const brave = (navigator as unknown as { brave?: { isBrave?: () => Promise<boolean> } }).brave;
    if (brave?.isBrave && (await brave.isBrave())) return "Brave";
  } catch {
    // fall through
  }

  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Firefox|FxiOS/.test(ua)) return "Chrome";

  return "Chrome";
};

const features = [
  {
    color: "from-purple-500 to-pink-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 22 1-1h3l9-9" />
        <path d="M3 21v-3l9-9" />
        <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3L12 9l3-3z" />
      </svg>
    ),
    title: "Pick from any page",
    desc: "Native EyeDropper integration — click anywhere on the web and grab the exact pixel color.",
  },
  {
    color: "from-fuchsia-500 to-rose-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    title: "HSV palette",
    desc: "Dial in any shade with a full HSV gradient, hue slider, and hex input — all in one popup.",
  },
  {
    color: "from-indigo-500 to-purple-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    title: "Saved history",
    desc: "Your last 60 picks live in a tap-to-copy grid — never lose a beautiful color again.",
  },
  {
    color: "from-cyan-500 to-blue-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Scan the page",
    desc: "Instantly extract every color used on the current page, ranked by frequency.",
  },
  {
    color: "from-amber-500 to-orange-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    ),
    title: "Auto-copy",
    desc: "Every pick lands in your clipboard automatically — paste straight into your CSS or Figma.",
  },
  {
    color: "from-emerald-500 to-teal-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private by design",
    desc: "Everything stays on your machine. No tracking, no servers, no analytics.",
  },
];

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/color-picker-by-siam-ahna/melggcnjlkhgjnnbhadkbdocjilkcnil";

const getInstallSteps = (browser: SupportedBrowser) => [
  {
    title: "Open the Web Store",
    desc: "Visit the extension's listing on the Chrome Web Store.",
  },
  {
    title: `Add to ${browser}`,
    desc: `Click the "Add to ${browser}" button at the top-right of the listing.`,
  },
  {
    title: "Confirm install",
    desc: "Approve the permissions prompt — it installs in seconds.",
  },
  {
    title: "Pin & enjoy",
    desc: "Pin the icon to your toolbar so it's one click away on any tab.",
  },
];

const ExtensionSection = () => {
  const [browser, setBrowser] = useState<SupportedBrowser>("Chrome");

  useEffect(() => {
    detectBrowser()
      .then(setBrowser)
      .catch(() => setBrowser("Chrome"));
  }, []);

  const installSteps = getInstallSteps(browser);

  return (
    <section
      id="extension"
      className="relative py-20 sm:py-28 scroll-mt-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent" />
      <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-pink-300/20 blur-3xl -z-10 animate-blob" style={{ animationDelay: "2s" }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold tracking-wider uppercase mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M21.17 8H12" />
              <path d="m3.95 6.06 4.99 8.63" />
              <path d="m10.88 21.94 5.01-8.63" />
            </svg>
            Chrome Extension
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Color Picker that
            <br />
            <span className="text-brand-gradient">lives in your browser.</span>
          </h2>
          <p className="mt-4 text-purple-900/70 max-w-2xl mx-auto">
            Pick colors from any page, view a tap-to-copy history, extract every color used on the
            page, or customize shades from a full HSV palette.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-purple-900 mb-2">A polished little workspace.</h3>
            <p className="text-purple-900/70 mb-6">
              Four tabs do everything you need — click through them in the preview to explore.
            </p>
            <ul className="space-y-3">
              {[
                { label: "Pick", desc: "EyeDropper + last pick + recent tiles" },
                { label: "Palette", desc: "HSV gradient + hue slider + hex input" },
                { label: "History", desc: "60-color grid, tap any swatch to recopy" },
                { label: "Page", desc: "Extract every color used on the active page" },
              ].map((row) => (
                <li key={row.label} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-gradient text-white text-[11px] font-bold flex items-center justify-center shadow-brand flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-purple-900">{row.label}</span>
                    <span className="text-purple-900/70"> — {row.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-brand-gradient rounded-[28px] blur-3xl opacity-25 scale-105 -z-10" />
            <ExtensionMockup />
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:-translate-y-1 hover:shadow-brand transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-purple-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-purple-900/65 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Install steps */}
        <div className="rounded-3xl p-1 bg-brand-gradient shadow-brand-lg">
          <div className="rounded-[22px] bg-white p-6 sm:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-purple-900">Install in 4 quick steps</h3>
              <p className="text-purple-900/60 mt-2 text-sm">
                Now live on the Chrome Web Store — one click and you&apos;re picking colors.
              </p>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg hover:scale-[1.03] transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
                Add to {browser}
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {installSteps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="absolute -top-3 -left-1 text-6xl font-black text-purple-100 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative pt-6 pl-3">
                    <h4 className="font-bold text-purple-900 mb-1.5">{step.title}</h4>
                    <p className="text-sm text-purple-900/65 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient text-white flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div className="text-sm text-purple-900/80">
                <span className="font-bold text-purple-900">Heads up:</span> the EyeDropper API
                works on regular web pages but not on Chrome system pages (like{" "}
                <code className="font-mono bg-white px-1.5 py-0.5 rounded text-pink-600 text-[12px]">chrome://</code>) — that&apos;s a browser
                restriction, not the extension.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtensionSection;
