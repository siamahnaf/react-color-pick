import CodeBlock from "./CodeBlock";
import PropsTable from "./PropsTable";
import PickerDocs from "./PickerDocs";

const installCode = `npm i @siamf/react-color-pick`;

const usageCode = `"use client"
import { useState } from "react";
import { ColorPicker } from "@siamf/react-color-pick";

const Sample = () => {
    const [color, setColor] = useState<string>("#C11FB5");

    return (
        <div>
            <ColorPicker
                value={color}
                onChange={(e) => setColor(e)}
            />
        </div>
    );
};

export default Sample;`;

const usageHighlighted = `<span class="tok-str">"use client"</span>
<span class="tok-key">import</span> { useState } <span class="tok-key">from</span> <span class="tok-str">"react"</span>;
<span class="tok-key">import</span> { <span class="tok-fn">ColorPicker</span> } <span class="tok-key">from</span> <span class="tok-str">"@siamf/react-color-pick"</span>;

<span class="tok-key">const</span> <span class="tok-fn">Sample</span> = () =&gt; {
    <span class="tok-key">const</span> [color, setColor] = <span class="tok-fn">useState</span>&lt;<span class="tok-tag">string</span>&gt;(<span class="tok-str">"#C11FB5"</span>);

    <span class="tok-key">return</span> (
        &lt;<span class="tok-tag">div</span>&gt;
            &lt;<span class="tok-tag">ColorPicker</span>
                <span class="tok-attr">value</span>={color}
                <span class="tok-attr">onChange</span>={(e) =&gt; <span class="tok-fn">setColor</span>(e)}
            /&gt;
        &lt;/<span class="tok-tag">div</span>&gt;
    );
};

<span class="tok-key">export default</span> Sample;`;

const cssImport = `import "@siamf/react-color-pick/dist/index.css"`;

const tailwindImport = `@source "../../node_modules/@siamf/react-color-pick";

/* Adjust the package path if needed */`;

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.913a2 2 0 0 1 1.288 1.287L12 21l1.913-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.913a2 2 0 0 1-1.287-1.287Z" />
      </svg>
    ),
    title: "Canva-style",
    desc: "A familiar, polished color UI that feels right at home in any product.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
        <path d="M14 2v6h6" />
        <path d="M10 12h4" />
      </svg>
    ),
    title: "Tiny API",
    desc: "Just <ColorPicker value onChange /> — drop it in and you're done.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6H4z" />
        <path d="M14 14h6v6h-6z" />
      </svg>
    ),
    title: "Fully themable",
    desc: "Override every internal piece with className props — match your brand.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: "Tailwind ready",
    desc: "First-class Tailwind v4 support, plus a plain CSS file when you need it.",
  },
];

const ReactPackageSection = () => {
  return (
    <section id="package" className="relative py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-5">
            <span>NPM Package</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-brand-gradient">@siamf/react-color-pick</span>
          </h2>
          <p className="mt-4 text-purple-900/70 max-w-2xl mx-auto">
            A canva-style React color picker — highly customizable, easy to use, and works with or
            without Tailwind.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <a
              href="https://www.npmjs.com/package/@siamf/react-color-pick"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cb3837] text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
            >
              <svg width="34" height="14" viewBox="0 0 780 250" fill="currentColor" aria-hidden="true">
                <path d="M240 250h100v-50h100V0H240v250zm100-200h50v100h-50V50zM480 0v200h100V50h50v150h50V50h50v150h50V0H480zM0 200h100V50h50v150h50V0H0v200z" />
              </svg>
              View on npm
            </a>
            <a
              href="https://github.com/siamahnaf/react-color-pick"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900 text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-brand transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-0 group-hover:opacity-[0.04] transition" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center mb-3 shadow-brand">
                  {f.icon}
                </div>
                <h3 className="font-bold text-purple-900 mb-1">{f.title}</h3>
                <p className="text-sm text-purple-900/65 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 mb-3">
              <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-extrabold text-xs">
                01
              </span>
              Install
            </h3>
            <CodeBlock code={installCode} language="bash" filename="terminal" />
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 mb-3">
              <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-extrabold text-xs">
                02
              </span>
              Use it
            </h3>
            <CodeBlock
              code={usageCode}
              highlighted={usageHighlighted}
              language="tsx"
              filename="Sample.tsx"
            />
          </div>
        </div>

        <div className="rounded-3xl p-1 bg-brand-gradient mb-16 shadow-brand-lg">
          <div className="rounded-[22px] bg-white p-6 sm:p-10">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-purple-900">Live Demo</h3>
              <p className="text-sm text-purple-900/60 mt-0.5">
                Try the component — drag the pad, slide the hue, type a hex.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-white border border-purple-100 p-6 flex justify-center">
              <PickerDocs />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 mb-3">
              <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-extrabold text-xs">
                03
              </span>
              Styling — plain CSS
            </h3>
            <p className="text-sm text-purple-900/70 mb-3">
              Not using Tailwind? Import the bundled stylesheet.
            </p>
            <CodeBlock code={cssImport} language="ts" filename="app.tsx" />
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 mb-3">
              <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-extrabold text-xs">
                03
              </span>
              Styling — Tailwind v4
            </h3>
            <p className="text-sm text-purple-900/70 mb-3">
              Add the package as a Tailwind source so utilities are scanned.
            </p>
            <CodeBlock code={tailwindImport} language="css" filename="globals.css" />
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink-600 mb-4">
            <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-extrabold text-xs">
              04
            </span>
            Available Props
          </h3>
          <PropsTable />
        </div>
      </div>
    </section>
  );
};

export default ReactPackageSection;
