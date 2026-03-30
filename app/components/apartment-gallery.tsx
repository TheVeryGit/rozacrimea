"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, TouchEvent } from "react";
import Image from "next/image";

export type ApartmentGalleryItem = {
  src?: string;
  title: string;
  accent: string;
};

function createFallbackStyles(item: ApartmentGalleryItem): CSSProperties {
  return {
    backgroundImage: `linear-gradient(135deg, ${item.accent} 0%, rgba(255, 249, 242, 0.98) 52%, rgba(110, 138, 96, 0.64) 100%)`,
  };
}

function GalleryImage({
  item,
  alt,
  sizes,
}: {
  item: ApartmentGalleryItem;
  alt: string;
  sizes: string;
}) {
  if (!item.src) {
    return <div className="absolute inset-0" style={createFallbackStyles(item)} />;
  }

  return (
    <Image
      fill
      src={item.src}
      alt={alt}
      className="object-cover"
      sizes={sizes}
      loading="lazy"
    />
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {direction === "left" ? (
        <path d="m14.5 5-7 7 7 7" />
      ) : (
        <path d="m9.5 5 7 7-7 7" />
      )}
    </svg>
  );
}

export function ApartmentGallery({
  items,
  title,
}: {
  items: ApartmentGalleryItem[];
  title: string;
}) {
  const safeItems =
    items.length > 0
      ? items
      : [
          {
            title,
            accent: "#d97853",
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const lastSwipeAt = useRef(0);
  const activeItem = safeItems[activeIndex] ?? safeItems[0];
  const canSlide = safeItems.length > 1;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? safeItems.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === safeItems.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const resetTouchState = () => {
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (!canSlide) {
      return;
    }

    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!canSlide || touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    resetTouchState();

    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 48) {
      return;
    }

    lastSwipeAt.current = Date.now();

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  useEffect(() => {
    if (!isFullscreen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowLeft" && canSlide) {
        setActiveIndex((currentIndex) =>
          currentIndex === 0 ? safeItems.length - 1 : currentIndex - 1,
        );
      }

      if (event.key === "ArrowRight" && canSlide) {
        setActiveIndex((currentIndex) =>
          currentIndex === safeItems.length - 1 ? 0 : currentIndex + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canSlide, isFullscreen, safeItems.length]);

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_24px_70px_rgba(99,69,48,0.12)] touch-pan-y sm:rounded-[36px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => {
              if (Date.now() - lastSwipeAt.current < 250) {
                return;
              }

              setIsFullscreen(true);
            }}
            className="absolute inset-0 z-10"
            aria-label={`Открыть галерею ${title} на весь экран`}
          />
          <GalleryImage item={activeItem} alt={activeItem.title} sizes="100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,35,27,0.08)_0%,rgba(45,35,27,0.54)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_26%)]" />

          {canSlide ? (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/84 text-[var(--accent-deep)] shadow-[0_10px_30px_rgba(45,35,27,0.14)] transition-transform duration-200 hover:-translate-y-[52%] sm:left-4 sm:h-12 sm:w-12"
                aria-label="Предыдущее фото"
              >
                <span className="h-5 w-5">
                  <ArrowIcon direction="left" />
                </span>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/84 text-[var(--accent-deep)] shadow-[0_10px_30px_rgba(45,35,27,0.14)] transition-transform duration-200 hover:-translate-y-[52%] sm:right-4 sm:h-12 sm:w-12"
                aria-label="Следующее фото"
              >
                <span className="h-5 w-5">
                  <ArrowIcon direction="right" />
                </span>
              </button>
            </>
          ) : null}

          <div className="relative flex min-h-[280px] items-end p-4 sm:min-h-[460px] sm:p-8 lg:min-h-[560px]">
            <div className="space-y-3 text-white">
              <div className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] backdrop-blur sm:text-xs">
                {activeIndex + 1} / {safeItems.length}
              </div>
              <p className="max-w-xl text-base font-semibold sm:text-2xl">{title}</p>
            </div>
          </div>
        </div>

        {canSlide ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {safeItems.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-[22px] border transition-transform duration-200 hover:-translate-y-0.5 ${
                  index === activeIndex
                    ? "border-[var(--accent)] shadow-[0_12px_30px_rgba(201,111,77,0.18)]"
                    : "border-[var(--border)]"
                }`}
                aria-label={`Показать фото ${index + 1}`}
              >
                <div className="relative aspect-[4/3]">
                  <GalleryImage
                    item={item}
                    alt={item.title}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,35,27,0.04)_0%,rgba(45,35,27,0.26)_100%)]" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {isFullscreen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,18,14,0.84)] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative h-full max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/18 bg-[#2b211b] shadow-[0_32px_120px_rgba(0,0,0,0.35)] touch-pan-y sm:rounded-[36px]"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-xl text-white backdrop-blur transition-colors duration-200 hover:bg-white/22"
              aria-label="Закрыть полноэкранную галерею"
            >
              ×
            </button>

            {canSlide ? (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur transition-colors duration-200 hover:bg-white/24 sm:left-4 sm:h-12 sm:w-12"
                  aria-label="Предыдущее фото"
                >
                  <span className="h-5 w-5">
                    <ArrowIcon direction="left" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/16 text-white backdrop-blur transition-colors duration-200 hover:bg-white/24 sm:right-4 sm:h-12 sm:w-12"
                  aria-label="Следующее фото"
                >
                  <span className="h-5 w-5">
                    <ArrowIcon direction="right" />
                  </span>
                </button>
              </>
            ) : null}

            <GalleryImage item={activeItem} alt={activeItem.title} sizes="100vw" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_24%),linear-gradient(180deg,rgba(45,35,27,0.02)_0%,rgba(45,35,27,0.66)_100%)]" />
            <div className="relative flex h-full items-end p-5 text-white sm:p-8 lg:p-10">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72 sm:text-sm">
                  Полноэкранный просмотр
                </p>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-4xl">
                  {title}
                </h3>
                <p className="text-sm text-white/78 sm:text-base">
                  Фото {activeIndex + 1} из {safeItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
