import Image from "next/image";
import Link from "next/link";

const socials = [
  { href: "https://siamahnaf.com/", label: "Website", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ) },
  { href: "https://github.com/siamahnaf", label: "GitHub", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
  ) },
  { href: "https://www.linkedin.com/in/siamahnaf/", label: "LinkedIn", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.22 0z"/></svg>
  ) },
  { href: "https://x.com/siamahnaf198", label: "X", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ) },
  { href: "https://www.npmjs.com/~siamahnaf", label: "npm", icon: (
    <svg width="20" height="14" viewBox="0 0 780 250" fill="currentColor"><path d="M240 250h100v-50h100V0H240v250zm100-200h50v100h-50V50zM480 0v200h100V50h50v150h50V50h50v150h50V0H480zM0 200h100V50h50v150h50V0H0v200z"/></svg>
  ) },
  { href: "https://wa.me/8801611994403", label: "WhatsApp", icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"/></svg>
  ) },
];

const Footer = () => {
  return (
    <footer className="relative mt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-pink-900" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-14 text-white">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur p-1.5">
                <Image src="/logo.png" alt="Logo" width={44} height={44} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="font-bold text-lg">Color Tools</div>
                <div className="text-xs text-pink-200/80">by Siam Ahnaf</div>
              </div>
            </div>
            <p className="text-sm text-purple-100/70 max-w-md leading-relaxed">
              Beautiful, open-source color tools — a Canva-style React component for your apps,
              and a polished Chrome extension that lives in your browser.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-pink-200/90 mb-3">Project</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#package" className="text-purple-100/80 hover:text-white transition">React Package</Link></li>
              <li><Link href="/#extension" className="text-purple-100/80 hover:text-white transition">Chrome Extension</Link></li>
              <li><Link href="/privacy" className="text-purple-100/80 hover:text-white transition">Privacy Policy</Link></li>
              <li><a href="https://www.npmjs.com/package/@siamf/react-color-pick" target="_blank" rel="noopener noreferrer" className="text-purple-100/80 hover:text-white transition">npm</a></li>
              <li><a href="https://github.com/siamahnaf" target="_blank" rel="noopener noreferrer" className="text-purple-100/80 hover:text-white transition">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-pink-200/90 mb-3">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-purple-200/70">
          <div>
            © {new Date().getFullYear()} Siam Ahnaf. Crafted with{" "}
            <span className="text-pink-300">♥</span> in Dhaka, Bangladesh.
          </div>
          <div>
            <a href="https://www.buymeacoffee.com/siamahnaf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400 text-purple-950 font-bold hover:bg-yellow-300 transition">
              ☕ Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
