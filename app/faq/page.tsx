import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/app/components/site-elements";
import { createWhatsAppLink, siteContent } from "@/lib/site";

export const metadata: Metadata = {
  title: `FAQ | ${siteContent.hero.title}`,
  description: "Ответы на частые вопросы до заселения и во время проживания.",
};

function FaqAccordion({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="space-y-6 rounded-[32px] border border-[var(--border)] bg-white/82 p-6 shadow-[0_24px_64px_rgba(99,69,48,0.08)] backdrop-blur sm:p-8">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group overflow-hidden rounded-[26px] border border-[rgba(201,111,77,0.14)] bg-[linear-gradient(180deg,#fffdf9_0%,#fff4e8_100%)] shadow-[0_14px_36px_rgba(99,69,48,0.06)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-lg font-semibold text-[var(--foreground)] marker:content-none sm:px-6">
              <span>{item.question}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(201,111,77,0.12)] text-[var(--accent-deep)]">
                ▾
              </span>
            </summary>
            <div className="border-t border-[rgba(229,209,190,0.78)] px-5 py-5 text-base leading-7 text-[color:rgba(45,35,27,0.74)] sm:px-6">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FaqPage() {
  const whatsappHref = createWhatsAppLink(
    siteContent.hero.whatsapp,
    "Здравствуйте! У меня остались вопросы по проживанию в Rozacrimea.",
  );

  return (
    <main className="px-4 py-4 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <div className="sticky top-3 z-40 w-fit sm:top-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/92 px-4 py-3 text-sm font-semibold text-[var(--accent-deep)] shadow-[0_16px_40px_rgba(118,84,63,0.08)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 sm:px-5"
          >
            ← На главную
          </Link>
        </div>

        <section className="overflow-hidden rounded-[36px] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(255,251,246,0.94)_0%,rgba(255,237,221,0.96)_55%,rgba(231,242,226,0.9)_100%)] p-7 shadow-[0_28px_80px_rgba(99,69,48,0.08)] sm:p-10">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--green)]">
              FAQ
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Частые вопросы перед поездкой и во время отдыха
            </h1>
            <p className="text-base leading-7 text-[color:rgba(45,35,27,0.74)] sm:text-lg">
              Собрали быстрые ответы на самые частые вопросы гостей. Если не
              нашли нужное, напишите нам в WhatsApp — подскажем лично.
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <FaqAccordion
            eyebrow="До заезда"
            title="До заселения"
            items={siteContent.faq.before_checkin}
          />
          <FaqAccordion
            eyebrow="Во время отдыха"
            title="После заселения"
            items={siteContent.faq.after_checkin}
          />
        </div>

        <section className="rounded-[32px] border border-[rgba(201,111,77,0.16)] bg-[linear-gradient(135deg,rgba(255,246,236,0.92)_0%,rgba(255,237,221,0.98)_100%)] p-6 shadow-[0_16px_44px_rgba(201,111,77,0.1)] sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--green)]">
                Остались вопросы?
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                Напишите нам, и мы быстро всё подскажем
              </h2>
              <p className="text-base leading-7 text-[color:rgba(45,35,27,0.72)]">
                Уточним свободные даты, условия проживания и поможем
                сориентироваться перед поездкой.
              </p>
            </div>
            <a
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-semibold text-[#fffaf6] transition-colors duration-200 hover:bg-[var(--accent-deep)]"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Остались вопросы? Напишите нам
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
