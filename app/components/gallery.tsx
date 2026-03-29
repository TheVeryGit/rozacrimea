"use client";

import { useEffect, useState } from "react";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  src?: string;
  accent: string;
};

function previewStyles(item: GalleryItem) {
  if (item.src) {
    return {
      backgroundImage: `linear-gradient(180deg, rgba(45, 35, 27, 0.08) 0%, rgba(45, 35, 27, 0.52) 100%), url("${item.src}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  return {
    backgroundImage: `linear-gradient(135deg, ${item.accent} 0%, rgba(255, 249, 242, 0.98) 52%, rgba(110, 138, 96, 0.64) 100%)`,
  };
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = items.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`group relative min-h-[240px] overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.7)] text-left shadow-[0_18px_50px_rgba(99,69,48,0.12)] transition-transform duration-300 hover:-translate-y-1 ${
              index % 5 === 0 ? "sm:col-span-2" : ""
            }`}
            aria-label={`Открыть фото: ${item.title}`}
          >
            <div className="absolute inset-0" style={previewStyles(item)} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_28%)]" />
            <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,rgba(45,35,27,0)_0%,rgba(45,35,27,0.72)_100%)] px-5 pb-5 pt-16 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                Галерея
              </p>
              <p className="mt-2 text-lg font-semibold">{item.title}</p>
            </div>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,18,14,0.82)] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/20 bg-[#2b211b] shadow-[0_32px_120px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-xl text-white backdrop-blur transition-colors duration-200 hover:bg-white/22"
              aria-label="Закрыть полноэкранный просмотр"
            >
              ×
            </button>
            <div className="absolute inset-0" style={previewStyles(activeItem)} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_24%),linear-gradient(180deg,rgba(45,35,27,0.02)_0%,rgba(45,35,27,0.68)_100%)]" />
            <div className="relative mt-auto w-full p-6 text-white sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/72">
                Полноэкранный просмотр
              </p>
              <h3 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {activeItem.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
