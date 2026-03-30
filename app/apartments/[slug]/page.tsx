import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApartmentGallery } from "@/app/components/apartment-gallery";
import {
  AmenityCard,
  DetailStat,
  SectionHeading,
} from "@/app/components/site-elements";
import {
  createApartmentInquiryMessage,
  createWhatsAppLink,
  formatPrice,
  getApartmentBySlug,
  getApartmentSlug,
  siteContent,
  warmAccents,
} from "@/lib/site";

type ApartmentPageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return siteContent.apartments.map((apartment) => ({
    slug: getApartmentSlug(apartment),
  }));
}

export function generateMetadata({ params }: ApartmentPageProps): Metadata {
  const apartment = getApartmentBySlug(params.slug);

  if (!apartment) {
    return {
      title: siteContent.hero.title,
      description: siteContent.hero.subtitle,
    };
  }

  return {
    title: `${apartment.name} | ${siteContent.hero.title}`,
    description: apartment.description,
  };
}

function AreaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 5h5M5 5v5M19 5h-5M19 5v5M5 19h5M5 19v-5M19 19h-5M19 19v-5" />
    </svg>
  );
}

function GuestsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M16.5 19v-1a3.5 3.5 0 0 0-3.5-3.5h-2A3.5 3.5 0 0 0 7.5 18v1" />
      <circle cx="12" cy="9" r="3" />
      <path d="M19 19v-.5A2.5 2.5 0 0 0 16.5 16M4.5 16A2.5 2.5 0 0 0 2 18.5V19" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 10h.01M17 14h.01" />
    </svg>
  );
}

export default function ApartmentPage({ params }: ApartmentPageProps) {
  const apartment = getApartmentBySlug(params.slug);

  if (!apartment) {
    notFound();
  }

  const galleryItems = apartment.photos.map((photo, photoIndex) => ({
    src: photo,
    title: `${apartment.name} — фото ${photoIndex + 1}`,
    accent: warmAccents[photoIndex % warmAccents.length],
  }));

  return (
    <main className="px-4 py-4 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="sticky top-3 z-40 w-fit sm:top-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/92 px-4 py-3 text-sm font-semibold text-[var(--accent-deep)] shadow-[0_16px_40px_rgba(118,84,63,0.08)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 sm:px-5"
          >
            ← Назад
          </Link>
        </div>

        <ApartmentGallery items={galleryItems} title={apartment.name} />

        <section className="space-y-8 rounded-[36px] border border-[var(--border)] bg-white/78 p-6 shadow-[0_24px_64px_rgba(99,69,48,0.09)] backdrop-blur sm:p-8 lg:p-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-deep)]">
              Апартаменты
            </p>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {apartment.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <DetailStat icon={<AreaIcon />} label="Площадь" value={apartment.area} />
            <DetailStat
              icon={<GuestsIcon />}
              label="Вместимость"
              value={apartment.guests}
            />
            <DetailStat
              icon={<PriceIcon />}
              label="Цена"
              value={`от ${formatPrice(apartment.price)} ₽ / сутки`}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <SectionHeading eyebrow="Описание" title="Пространство для спокойного отдыха" />
            <p className="text-base leading-7 text-[color:rgba(45,35,27,0.75)] sm:text-lg sm:leading-8">
              {apartment.description}
            </p>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Удобства номера"
              title="Все важное уже внутри"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {apartment.amenities.map((amenity) => (
                <AmenityCard key={amenity} amenity={amenity} />
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[rgba(201,111,77,0.16)] bg-[linear-gradient(135deg,rgba(255,246,236,0.92)_0%,rgba(255,237,221,0.98)_100%)] p-6 shadow-[0_16px_44px_rgba(201,111,77,0.1)] sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--green)]">
                  Бронирование
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  Напишите в WhatsApp и уточните свободные даты
                </h2>
                <p className="text-base leading-7 text-[color:rgba(45,35,27,0.72)]">
                  Мы быстро ответим по этому апартаменту, подтвердим актуальную
                  стоимость и поможем подобрать удобные даты.
                </p>
              </div>
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-semibold text-[#fffaf6] transition-colors duration-200 hover:bg-[var(--accent-deep)]"
                href={createWhatsAppLink(
                  siteContent.hero.whatsapp,
                  createApartmentInquiryMessage(apartment.name),
                )}
                target="_blank"
                rel="noreferrer"
              >
                Узнать свободные даты
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
