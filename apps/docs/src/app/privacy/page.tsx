import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Color Picker Chrome Extension",
  description:
    "Privacy policy for the Color Picker Chrome extension by Siam Ahnaf. No tracking, no analytics, no data leaves your device.",
};

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const permissions = [
  {
    name: "activeTab",
    use: "Only used when you click \"Pick a Color\" or refresh the Page tab. Gives temporary access to the tab you're currently on — never to other tabs.",
  },
  {
    name: "scripting",
    use: "Required to read the colors on the current page when you press Refresh in the Page tab. The script runs in your tab and returns a list of hex values — nothing is sent anywhere.",
  },
  {
    name: "storage",
    use: "Saves your color history in chrome.storage.local, which stays on your device. The extension never syncs history to the cloud or to any server.",
  },
  {
    name: "clipboardWrite",
    use: "Lets the extension automatically copy a picked color to your clipboard so you can paste it straight into Figma, CSS, or anywhere else.",
  },
];

const principles = [
  {
    title: "No data collection",
    desc: "We don't collect, transmit, or share any personal information, browsing data, or page content. Ever.",
  },
  {
    title: "No analytics or tracking",
    desc: "No Google Analytics, no telemetry, no usage pings. There is no server-side component — period.",
  },
  {
    title: "No third parties",
    desc: "The extension doesn't load remote scripts, fonts, or images. Everything ships in the extension bundle.",
  },
  {
    title: "Local-only storage",
    desc: "Your color history lives in chrome.storage.local on your device. Clearing it from the History tab deletes it instantly.",
  },
];

const PrivacyPage = () => {
  return (
    <>
      <Nav />
      <main className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 sm:pt-24 pb-14">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-8 -left-24 w-[340px] h-[340px] rounded-full bg-purple-400/25 blur-3xl animate-blob" />
            <div className="absolute top-20 -right-24 w-[380px] h-[380px] rounded-full bg-pink-400/25 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
          </div>

          <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-purple-200/60 text-xs font-semibold text-purple-800 mb-7 shadow-sm">
              <ShieldIcon />
              Privacy Policy
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Your colors,
              <br />
              <span className="text-brand-gradient">your business.</span>
            </h1>
            <p className="mt-5 text-purple-900/70 max-w-xl mx-auto leading-relaxed">
              The Color Picker Chrome extension is built around a single rule: nothing you do
              inside it ever leaves your device.
            </p>
            <p className="mt-3 text-xs text-purple-900/50">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="pb-14">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="relative p-6 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-brand transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center shadow-brand flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 mb-1">{p.title}</h3>
                      <p className="text-sm text-purple-900/65 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-12">
            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">1.</span> Information we collect
              </h2>
              <p className="text-purple-900/75 leading-relaxed">
                <strong className="text-purple-900">None.</strong> The Color Picker extension does
                not collect, log, transmit, or sell any personal information, browsing history,
                page content, IP addresses, or device identifiers. There is no backend server,
                no analytics SDK, and no third-party service involved.
              </p>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">2.</span> What stays on your device
              </h2>
              <p className="text-purple-900/75 leading-relaxed mb-4">
                The extension stores a single piece of data — your color history — locally in
                <code className="font-mono text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded mx-1 text-[13px]">chrome.storage.local</code>
                on your machine. This includes up to 60 hex color codes you have picked. It is
                never synced to the cloud or shared with anyone.
              </p>
              <p className="text-purple-900/75 leading-relaxed">
                You can delete this data at any time by opening the extension, navigating to the{" "}
                <strong className="text-purple-900">History</strong> tab, and pressing{" "}
                <strong className="text-purple-900">Clear</strong>. Uninstalling the extension
                removes it permanently as well.
              </p>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-4">
                <span className="text-brand-gradient">3.</span> Permissions, explained
              </h2>
              <p className="text-purple-900/75 leading-relaxed mb-5">
                The extension requests a small set of Chrome permissions. Here is exactly what
                each one is used for:
              </p>
              <div className="rounded-2xl overflow-hidden border border-purple-100 bg-white">
                {permissions.map((p, i) => (
                  <div
                    key={p.name}
                    className={`p-5 ${i !== permissions.length - 1 ? "border-b border-purple-100" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-5">
                      <code className="self-start font-mono text-sm font-bold text-purple-700 bg-purple-100/70 px-2.5 py-1 rounded-lg whitespace-nowrap">
                        {p.name}
                      </code>
                      <p className="text-sm text-purple-900/75 leading-relaxed">{p.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">4.</span> Network activity
              </h2>
              <p className="text-purple-900/75 leading-relaxed">
                The extension makes <strong className="text-purple-900">zero network requests</strong>.
                It does not load remote scripts, fonts, images, or any other external resources at
                runtime. Everything it needs is bundled into the extension itself.
              </p>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">5.</span> Cookies & tracking
              </h2>
              <p className="text-purple-900/75 leading-relaxed">
                The extension does not set cookies, fingerprint your device, or use any form of
                tracking technology.
              </p>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">6.</span> Children&apos;s privacy
              </h2>
              <p className="text-purple-900/75 leading-relaxed">
                The extension is safe for users of all ages. Because no personal data is collected,
                no information is ever obtained from children under 13.
              </p>
            </article>

            <article>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-3">
                <span className="text-brand-gradient">7.</span> Changes to this policy
              </h2>
              <p className="text-purple-900/75 leading-relaxed">
                If this policy is ever updated, the new version will be published on this page and
                the &ldquo;Last updated&rdquo; date at the top will change. Continuing to use the
                extension after an update means you accept the revised policy.
              </p>
            </article>

            {/* Contact */}
            <article>
              <div className="rounded-3xl p-1 bg-brand-gradient shadow-brand-lg">
                <div className="rounded-[22px] bg-white p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-purple-900 mb-2">Questions? Get in touch.</h2>
                  <p className="text-purple-900/70 mb-5">
                    If anything in this policy isn&apos;t clear, or you spot something that
                    concerns you, please reach out.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:mail@siamahnaf.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg hover:scale-[1.03] transition"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      mail@siamahnaf.com
                    </a>
                    <a
                      href="https://siamahnaf.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-50 transition"
                    >
                      siamahnaf.com
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <div className="text-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-pink-600 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to the docs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
