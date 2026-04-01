import Link from "next/link";
import { Gallery, type GalleryItem } from "@/app/components/gallery";
import { StickyNav } from "@/app/components/sticky-nav";
import {
  AmenityCard,
  PhotoBlock,
  SectionHeading,
} from "@/app/components/site-elements";
import {
  createApartmentAvailabilityMessage,
  createTelegramLink,
  createTelLink,
  createWhatsAppLink,
  formatPrice,
  getApartmentSlug,
  siteContent,
  warmAccents,
} from "@/lib/site";

export default function Home() {
  const phoneHref = createTelLink(siteContent.hero.phone);
  const whatsappHref = createWhatsAppLink(siteContent.hero.whatsapp);
  const telegram = siteContent.hero.telegram.trim();
  const telegramHref = telegram ? createTelegramLink(telegram) : null;

  const galleryItems: GalleryItem[] = siteContent.apartments.flatMap(
    (apartment, apartmentIndex) =>
      apartment.photos.map((photo, photoIndex) => ({
        id: `${getApartmentSlug(apartment)}-${photoIndex}`,
        title: apartment.name,
        description: apartment.description,
        src: photo,
        accent: warmAccents[(apartmentIndex + photoIndex) % warmAccents.length],
      })),
  );

  return (
    <main id="top" className="overflow-x-hidden">
      {siteContent.promo.active ? (
        <section className="border-b border-[rgba(156,82,55,0.16)] bg-[linear-gradient(90deg,#bf5f3f_0%,#d37d58_50%,#e2a161_100%)] px-4 py-3 text-sm font-medium text-[#fff8f0] sm:text-base">
          <div className="mx-auto flex max-w-6xl items-center justify-center text-center">
            {siteContent.promo.text}
          </div>
        </section>
      ) : null}

      <StickyNav />

      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,28,22,0.24),rgba(38,28,22,0.64))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(233,164,120,0.28),_transparent_32%),linear-gradient(135deg,rgba(200,110,76,0.22)_0%,rgba(241,196,151,0.12)_44%,rgba(117,147,109,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.28),_transparent_24%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl rounded-[32px] border border-white/20 bg-white/12 p-7 text-white shadow-[0_24px_80px_rgba(46,29,20,0.2)] backdrop-blur-md sm:p-10 lg:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-white/80">
              Золотой Крым
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {siteContent.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
              {siteContent.hero.subtitle}
            </p>
            <p className="mt-8 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90">
              {siteContent.address}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[var(--accent-deep)] transition-transform duration-200 hover:-translate-y-0.5"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/16"
                href={phoneHref}
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="apartments"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeading
            eyebrow="Апартаменты"
            title="Три формата отдыха для пары, семьи или компании"
            description="У каждого апартамента теперь есть отдельная страница с галереей, параметрами и удобствами."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {siteContent.apartments.map((apartment, index) => {
              const slug = getApartmentSlug(apartment);
              const apartmentHref = `/apartments/${slug}`;

              return (
                <article
                  key={apartment.name}
                  className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-white/88 shadow-[0_22px_60px_rgba(99,69,48,0.1)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link
                    href={apartmentHref}
                    className="absolute inset-0 z-10 rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4"
                    aria-label={`Открыть страницу ${apartment.name}`}
                  >
                    <span className="sr-only">{apartment.name}</span>
                  </Link>

                  <PhotoBlock
                    label={apartment.area}
                    accentColor={warmAccents[index % warmAccents.length]}
                    src={apartment.photos[0]}
                    alt={apartment.name}
                    className="m-4 h-64"
                  />

                  <div className="space-y-5 px-6 pb-7 pt-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                          {apartment.name}
                        </h3>
                        <span className="rounded-full bg-[rgba(110,138,96,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green)]">
                          Подробнее
                        </span>
                      </div>
                      <p className="text-base leading-7 text-[color:rgba(45,35,27,0.72)]">
                        {apartment.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm text-[color:rgba(45,35,27,0.68)]">
                      <span className="rounded-full bg-[rgba(201,111,77,0.1)] px-3 py-1.5">
                        {apartment.guests}
                      </span>
                      <span className="rounded-full bg-[rgba(110,138,96,0.1)] px-3 py-1.5">
                        {apartment.area}
                      </span>
                    </div>

                    <div className="border-t border-[rgba(229,209,190,0.8)] pt-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <p className="text-xl font-semibold text-[var(--accent-deep)]">
                          от {formatPrice(apartment.price)} ₽ / сутки
                        </p>
                        <a
                          className="relative z-20 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#fffaf6] transition-colors duration-200 hover:bg-[var(--accent-deep)]"
                          href={createWhatsAppLink(
                            siteContent.hero.whatsapp,
                            createApartmentAvailabilityMessage(apartment.name),
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Узнать свободные даты
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="scroll-mt-24 bg-[rgba(255,250,244,0.88)] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeading
            eyebrow="Галерея"
            title="Светлые пространства, террасы и южное настроение"
            description="Сетка собирается из фотографий, указанных у каждого апартамента в content.json."
          />
          <Gallery items={galleryItems} />
        </div>
      </section>

      <section
        id="amenities"
        className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeading
            eyebrow="Удобства"
            title="Все, что нужно для спокойного отдыха у моря"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {siteContent.amenities.map((amenity) => (
              <AmenityCard key={amenity} amenity={amenity} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgba(255,250,244,0.88)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeading
            eyebrow="Расположение"
            title="Тихий коттеджный поселок рядом с морем"
            description="До пляжа около километра, вокруг спокойная атмосфера и удобный подъезд на машине."
          />
          <div className="overflow-hidden rounded-[32px] border border-[var(--border)] bg-white shadow-[0_20px_60px_rgba(99,69,48,0.1)]">
            <iframe
              className="h-[380px] w-full sm:h-[460px]"
              src="https://yandex.ru/map-widget/v1/?ll=32.915044,45.370697&z=15&pt=32.915044,45.370697,pm2rdm"
              title="Карта расположения гостевого дома"
              loading="lazy"
            />
            <div className="border-t border-[var(--border)] px-6 py-5 text-base text-[color:rgba(45,35,27,0.76)]">
              {siteContent.address}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionHeading
            eyebrow="Отзывы"
            title="Нас выбирают"
            description="Рейтинг и виджет отзывов помогут гостям быстро увидеть реальный опыт проживания."
          />
          <div className="space-y-6 rounded-[32px] border border-[var(--border)] bg-white/88 p-6 shadow-[0_24px_64px_rgba(99,69,48,0.1)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-[rgba(110,138,96,0.28)] bg-[rgba(110,138,96,0.14)] px-4 py-2 text-sm font-semibold text-[var(--green)]">
                  Хорошее место 2026
                </span>
                <span className="inline-flex rounded-full border border-[rgba(201,111,77,0.18)] bg-[rgba(201,111,77,0.12)] px-4 py-2 text-sm font-semibold text-[var(--accent-deep)]">
                  4.8 ★
                </span>
              </div>
              <p className="text-sm leading-6 text-[color:rgba(45,35,27,0.68)]">
                Отзывы гостей в Яндекс Картах
              </p>
            </div>
            <iframe
              className="h-[400px] w-full overflow-hidden rounded-[24px] border border-[var(--border)]"
              src={`https://yandex.ru/maps-reviews-widget/${siteContent.yandex_org_id}?comments`}
              title="Отзывы гостей"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section
        id="contacts"
        className="scroll-mt-24 bg-[rgba(255,250,244,0.88)] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Контакты"
              title="Ответим быстро и поможем подобрать удобные даты"
              description="Работаем круглосуточно — всегда на связи."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_18px_50px_rgba(99,69,48,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-deep)]">
                  Телефон
                </p>
                <a
                  className="mt-3 block text-2xl font-semibold text-[var(--foreground)]"
                  href={phoneHref}
                >
                  {siteContent.hero.phone}
                </a>
              </div>
              <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[0_18px_50px_rgba(99,69,48,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-deep)]">
                  Адрес
                </p>
                <p className="mt-3 text-base leading-7 text-[color:rgba(45,35,27,0.76)]">
                  {siteContent.address}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--border)] bg-[linear-gradient(180deg,#fffdf9_0%,#fff2e5_100%)] p-7 shadow-[0_24px_64px_rgba(99,69,48,0.1)] sm:p-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--green)]">
                На связи 24/7
              </p>
              <h3 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                Напишите в удобный мессенджер
              </h3>
              <p className="text-base leading-7 text-[color:rgba(45,35,27,0.72)]">
                Быстро подскажем по свободным датам, стоимости и условиям проживания.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-base font-semibold text-[#fffaf6] transition-colors duration-200 hover:bg-[var(--accent-deep)] sm:flex-1"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                  <Link
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(201,111,77,0.26)] bg-white/70 px-6 text-base font-semibold text-[var(--accent-deep)] transition-colors duration-200 hover:bg-white sm:flex-1"
                    href="/faq"
                  >
                    Частые вопросы
                  </Link>
                </div>
                {telegramHref ? (
                  <a
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-[rgba(110,138,96,0.3)] bg-[rgba(110,138,96,0.12)] px-6 text-base font-semibold text-[var(--green)] transition-colors duration-200 hover:bg-[rgba(110,138,96,0.18)]"
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
