"use client";
import { useState } from "react";
import Image from "next/image";

type TabKey = "pick" | "palette" | "history" | "page";

const recentColors = ["#8100D1", "#FF52A0", "#B317C8", "#23D7C0"];
const historyColors = [
  "#8100D1", "#FF52A0", "#B317C8", "#23D7C0", "#FFD166",
  "#06D6A0", "#EF476F", "#118AB2", "#073B4C", "#F77F00",
  "#FCBF49", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0",
];
const pageColors = [
  "#FFFFFF", "#0F172A", "#8100D1", "#FF52A0", "#E2E8F0",
  "#1E293B", "#64748B", "#A78BFA", "#F472B6", "#22D3EE",
];

const TabIcon = ({ name }: { name: TabKey }) => {
  const icons: Record<TabKey, React.ReactNode> = {
    pick: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 22 1-1h3l9-9" />
        <path d="M3 21v-3l9-9" />
        <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3L12 9l3-3z" />
      </svg>
    ),
    palette: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    history: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    page: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  };
  return icons[name];
};

const ExtensionMockup = () => {
  const [tab, setTab] = useState<TabKey>("pick");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "pick", label: "Pick" },
    { key: "palette", label: "Palette" },
    { key: "history", label: "History" },
    { key: "page", label: "Page" },
  ];

  return (
    <div className="mx-auto" style={{ width: 340 }}>
      <div className="rounded-[22px] overflow-hidden bg-white shadow-brand-lg ring-1 ring-purple-200/60">
        {/* Header */}
        <div className="relative bg-brand-gradient text-white px-4 py-4 overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-pink-300/40 blur-2xl" />
          <div className="absolute -bottom-16 -left-10 w-36 h-36 rounded-full bg-purple-700/40 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/30 backdrop-blur p-1.5 shadow">
                <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="font-bold text-[15px] leading-tight">Color Picker</div>
                <div className="text-[10px] opacity-90 mt-0.5">by Siam Ahnaf</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center" title="About">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1.5 bg-purple-50 border-b border-purple-100">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-[12px] font-semibold transition ${
                tab === t.key
                  ? "bg-white text-purple-900 shadow-sm"
                  : "text-purple-700/70 hover:text-purple-900"
              }`}
            >
              <TabIcon name={t.key} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-4 min-h-[300px] bg-white">
          {tab === "pick" && (
            <div className="space-y-3">
              <button className="w-full bg-brand-gradient text-white font-semibold py-3 rounded-xl shadow-brand flex items-center justify-center gap-2 hover:shadow-brand-lg transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 22 1-1h3l9-9" />
                  <path d="M3 21v-3l9-9" />
                  <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3L12 9l3-3z" />
                </svg>
                Pick a Color
              </button>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                <div className="w-10 h-10 rounded-lg shadow-inner ring-1 ring-black/5" style={{ background: "#8100D1" }} />
                <div className="flex-1">
                  <div className="text-[10px] text-purple-700/60 uppercase tracking-wider font-semibold">Last picked</div>
                  <div className="font-mono font-bold text-purple-900 text-sm">#8100D1</div>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white text-purple-700 flex items-center justify-center hover:bg-purple-100 transition" title="Copy">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
              </div>

              <div>
                <div className="text-[10px] text-purple-700/60 uppercase tracking-wider font-semibold mb-2">Recent</div>
                <div className="flex gap-2">
                  {recentColors.map((c) => (
                    <div
                      key={c}
                      className="w-12 h-12 rounded-xl shadow-sm ring-1 ring-black/5"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-purple-900/55 leading-relaxed mt-2">
                Click <strong>Pick a Color</strong>, then click anywhere on the page. The color is
                copied to your clipboard automatically.
              </p>
            </div>
          )}

          {tab === "palette" && (
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-purple-900 text-sm">Color Palette</h4>
                <p className="text-[11px] text-purple-700/60">Customize your color for getting best picks.</p>
              </div>
              <div className="relative h-36 rounded-xl overflow-hidden ring-1 ring-black/5" style={{ background: "hsl(293, 100%, 50%)" }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000, transparent)" }} />
                <div className="absolute w-4 h-4 rounded-full border-2 border-white shadow ring-1 ring-black/20" style={{ left: "75%", top: "20%", transform: "translate(-50%, -50%)" }} />
              </div>
              <div className="relative h-3 rounded-full overflow-hidden ring-1 ring-black/5" style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}>
                <div className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-white shadow ring-1 ring-black/20 -top-0.5" style={{ left: "81%" }} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-2.5 py-2 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="w-7 h-7 rounded-lg ring-1 ring-black/5" style={{ background: "#B317C8" }} />
                  <input
                    value="#B317C8"
                    readOnly
                    className="flex-1 bg-transparent font-mono font-semibold text-purple-900 text-sm outline-none"
                  />
                </div>
                <button className="px-3 py-2 rounded-xl bg-brand-gradient text-white shadow-brand hover:shadow-brand-lg transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-purple-900 text-sm">History</h4>
                <button className="text-[11px] font-semibold text-pink-600 hover:text-pink-700">Clear</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {historyColors.map((c) => (
                  <div
                    key={c}
                    className="aspect-square rounded-lg shadow-sm ring-1 ring-black/5 hover:scale-105 transition"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {tab === "page" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-purple-900 text-sm">Colors on this page</h4>
                <button className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {pageColors.map((c) => (
                  <div
                    key={c}
                    className={`aspect-square rounded-lg shadow-sm ring-1 ring-black/10 hover:scale-105 transition ${c === "#FFFFFF" ? "swatch-checker" : ""}`}
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-purple-700/60 py-3 bg-purple-50/50 border-t border-purple-100">
          Made with <span className="text-pink-500">♥</span> by{" "}
          <span className="font-semibold text-purple-900">Siam Ahnaf</span>
        </div>
      </div>
    </div>
  );
};

export default ExtensionMockup;
