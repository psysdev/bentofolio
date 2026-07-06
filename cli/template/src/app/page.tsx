import { layoutConfig } from "@/config/profile";
import BentoGrid from "@/components/grid/BentoGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 50, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 50, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 50, 0.15) 2px, rgba(0, 255, 50, 0.15) 4px)",
        }}
      />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] max-w-full bg-emerald-500/[0.02] blur-[120px] rounded-full" />

      <header className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-stone-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded border border-emerald-500/30 bg-emerald-500/5">
              <span className="font-mono text-[10px] font-bold text-emerald-400">~</span>
            </div>
            <span className="font-mono text-xs text-stone-500">
              <span className="text-emerald-400">bentofolio</span>
              <span className="text-stone-700">/</span>
              <span className="text-stone-500">dev</span>
            </span>
          </div>
          <div className="font-mono text-[10px] text-stone-700">
            <span className="text-emerald-400/40">❯</span> index.html
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <BentoGrid layout={layoutConfig} />
      </main>

      <footer className="relative z-10 border-t border-stone-800/50 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] text-stone-700">
              <span className="text-emerald-400/30">$</span> built with bentofolio
            </p>
            <p className="font-mono text-[10px] text-stone-700">
              edit src/config/profile.ts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
