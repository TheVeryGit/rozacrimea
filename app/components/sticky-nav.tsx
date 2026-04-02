"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteContent } from "@/lib/site";

const navItems = [
  { href: "/#apartments", label: "Апартаменты", sectionId: "apartments" },
  { href: "/#gallery", label: "Галерея", sectionId: "gallery" },
  { href: "/#amenities", label: "Удобства", sectionId: "amenities" },
  { href: "/#contacts", label: "Контакты", sectionId: "contacts" },
  { href: "/faq", label: "FAQ" },
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

function getLinkClass(isActive: boolean, mobile = false) {
  const baseClass = mobile
    ? "rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300"
    : "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300";

  if (isActive) {
    return `${baseClass} bg-[linear-gradient(135deg,rgba(255,255,255,0.97)_0%,rgba(255,239,224,0.96)_100%)] text-[var(--accent-deep)] shadow-[0_12px_30px_rgba(156,82,55,0.16)] ring-1 ring-[rgba(201,111,77,0.08)]`;
  }

  return mobile
    ? `${baseClass} bg-white/90 text-[var(--foreground)] shadow-[0_12px_30px_rgba(118,84,63,0.06)] hover:text-[var(--accent-deep)]`
    : `${baseClass} text-[var(--foreground)] hover:bg-white hover:text-[var(--accent-deep)]`;
}

export function StickyNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/#apartments");
  const topOffsetClass = siteContent.promo.active ? "top-[52px] sm:top-[56px]" : "top-0";

  useEffect(() => {
    setIsOpen(false);

    if (pathname === "/faq") {
      setActiveHref("/faq");
      return;
    }

    if (pathname !== "/") {
      setActiveHref("/#apartments");
      return;
    }

    const sectionIds = navItems
      .map((item) => item.sectionId)
      .filter((value): value is string => Boolean(value));

    const updateActiveSection = () => {
      const offset = window.scrollY + 170;
      let nextHref = "/#apartments";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && offset >= section.offsetTop) {
          nextHref = `/#${sectionId}`;
        }
      });

      setActiveHref(nextHref);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 border-b border-[rgba(229,209,190,0.72)] bg-[rgba(255,249,244,0.82)] backdrop-blur-xl ${topOffsetClass}`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-4 py-2">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-deep)]"
            >
              {siteContent.hero.title}
            </Link>

            <nav className="hidden items-center gap-2 md:flex" aria-label="Основная навигация">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveHref(item.href)}
                  className={getLinkClass(activeHref === item.href)}
                >
                  {item.label}
                </Link>
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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActiveHref(item.href);
                    setIsOpen(false);
                  }}
                  className={getLinkClass(activeHref === item.href, true)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </header>

      <div className={siteContent.promo.active ? "h-[132px] sm:h-[136px]" : "h-20"} aria-hidden="true" />
    </>
  );
}
