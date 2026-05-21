"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-purple-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-gradient p-1.5 shadow-brand group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight leading-tight">Color Tools</div>
            <div className="text-[10px] text-purple-700/60 leading-tight">by Siam Ahnaf</div>
          </div>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <a
            href="#package"
            className="px-3 py-1.5 rounded-full text-purple-900/80 hover:text-purple-900 hover:bg-purple-100/60 transition"
          >
            React Package
          </a>
          <a
            href="#extension"
            className="px-3 py-1.5 rounded-full text-purple-900/80 hover:text-purple-900 hover:bg-purple-100/60 transition"
          >
            Chrome Extension
          </a>
          <a
            href="https://github.com/siamahnaf/react-color-pick"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-gradient text-white shadow-brand hover:shadow-brand-lg hover:scale-[1.03] transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
