"use client";

import { useState } from "react";
import { siteContent } from "@/lib/site";

const navItems = [
  { href: "#apartments", label: "Апартаменты" },
  { href: "#gallery", label: "Галерея" },
  { href: "#amenities", label: "Удобства" },
  { href: "#contacts", label: "Контакты" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {open ? (
        <path d="M6 6 18 18M18 6 6 18" />
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function StickyNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(229,209,190,0.72)] bg-[rgba(255,249,244,0.82)] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-2">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-deep)]"
          >
            {siteContent.hero.title}
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-white hover:text-[var(--accent-deep)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/88 text-[var(--accent-deep)] shadow-[0_12px_30px_rgba(118,84,63,0.08)] md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span className="h-5 w-5">
              <MenuIcon open={isOpen} />
            </span>
          </button>
        </div>

        {isOpen ? (
          <nav
            id="mobile-menu"
            className="grid gap-2 border-t border-[rgba(229,209,190,0.72)] py-3 md:hidden"
            aria-label="Мобильная навигация"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_12px_30px_rgba(118,84,63,0.06)] transition-colors duration-200 hover:text-[var(--accent-deep)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
