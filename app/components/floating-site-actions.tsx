"use client";

import { useEffect, useState } from "react";
import {
  createTelegramLink,
  createTelLink,
  createWhatsAppLink,
  siteContent,
} from "@/lib/site";
import {
  ArrowUpIcon,
  CloseIcon,
  MessageIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/app/components/site-icons";

export function FloatingSiteActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const telegram = siteContent.hero.telegram.trim();
  const actions = [
    {
      href: createWhatsAppLink(siteContent.hero.whatsapp),
      label: "WhatsApp",
      icon: WhatsAppIcon,
      className:
        "bg-[linear-gradient(135deg,#29a56a_0%,#47c88a_100%)] text-white shadow-[0_18px_38px_rgba(41,165,106,0.28)]",
    },
    ...(telegram
      ? [
          {
            href: createTelegramLink(telegram),
            label: "Telegram",
            icon: TelegramIcon,
            className:
              "bg-[linear-gradient(135deg,#2f95ff_0%,#5cc8ff_100%)] text-white shadow-[0_18px_38px_rgba(47,149,255,0.26)]",
          },
        ]
      : []),
    {
      href: createTelLink(siteContent.hero.phone),
      label: "Позвонить",
      icon: PhoneIcon,
      className:
        "bg-[linear-gradient(135deg,#fff7ef_0%,#ffe8d3_100%)] text-[var(--accent-deep)] shadow-[0_18px_38px_rgba(156,82,55,0.18)]",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {showTopButton ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(201,111,77,0.18)] bg-white/92 text-[var(--accent-deep)] shadow-[0_16px_34px_rgba(99,69,48,0.16)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          aria-label="Наверх"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      ) : null}

      <div className="pointer-events-auto flex flex-col items-end gap-2">
        {isExpanded ? (
          <div className="flex flex-col items-end gap-2">
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`inline-flex h-14 w-[calc(100vw-2rem)] max-w-[15rem] items-center gap-3 rounded-full px-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:w-56 ${action.className}`}
                  style={{
                    transitionDelay: `${index * 45}ms`,
                  }}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/10">
                    <Icon className="h-5 w-5 shrink-0" />
                  </span>
                  <span className="flex-1 text-left">{action.label}</span>
                </a>
              );
            })}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[linear-gradient(135deg,#c96f4d_0%,#d9875c_55%,#ebb67e_100%)] px-4 pr-5 text-sm font-semibold text-[#fffaf6] shadow-[0_20px_42px_rgba(156,82,55,0.28)] transition-all duration-300 hover:-translate-y-0.5"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Свернуть способы связи" : "Открыть способы связи"
          }
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/16">
            {isExpanded ? (
              <CloseIcon className="h-4.5 w-4.5" />
            ) : (
              <MessageIcon className="h-4.5 w-4.5" />
            )}
          </span>
          <span className="hidden sm:inline">
            {isExpanded ? "Скрыть" : "Связаться"}
          </span>
        </button>
      </div>
    </div>
  );
}
