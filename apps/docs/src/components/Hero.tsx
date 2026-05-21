import Image from "next/image";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-12 sm:pt-20 pb-20 sm:pb-28">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 -left-24 w-[360px] h-[360px] rounded-full bg-purple-400/30 blur-3xl animate-blob" />
        <div className="absolute top-20 -right-24 w-[420px] h-[420px] rounded-full bg-pink-400/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-fuchsia-400/20 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur border border-purple-200/60 text-xs font-semibold text-purple-800 mb-7 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Two color tools, one beautiful workflow
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          Pick colors,
          <br />
          <span className="text-brand-gradient">beautifully.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-purple-900/70 max-w-2xl mx-auto leading-relaxed">
          A canva-style{" "}
          <span className="font-semibold text-purple-900">React component</span> for your apps, and
          a polished{" "}
          <span className="font-semibold text-pink-600">Chrome extension</span> that picks colors
          from any page on the web.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#package"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg hover:scale-[1.03] transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 18l6-6-6-6" />
              <path d="M8 6l-6 6 6 6" />
            </svg>
            React Package
          </a>
          <a
            href="#extension"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-purple-200 text-purple-900 font-semibold hover:bg-purple-50 hover:border-purple-300 transition shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M21.17 8H12" />
              <path d="m3.95 6.06 4.99 8.63" />
              <path d="m10.88 21.94 5.01-8.63" />
            </svg>
            Chrome Extension
          </a>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 bg-brand-gradient rounded-3xl blur-2xl opacity-40 scale-110" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-brand-gradient p-4 shadow-brand-lg">
              <Image
                src="/logo.png"
                alt="Color Picker Logo"
                width={112}
                height={112}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
