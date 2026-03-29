import content from "@/content.json";

export type Apartment = {
  name: string;
  description: string;
  price: string;
  photos: string[];
  amenities: string[];
  area: string;
  guests: string;
};

export type SiteContent = {
  hero: {
    title: string;
    subtitle: string;
    phone: string;
    whatsapp: string;
    telegram: string;
  };
  apartments: Apartment[];
  amenities: string[];
  address: string;
  yandex_org_id: string;
  promo: {
    active: boolean;
    text: string;
  };
};

export const siteContent = content as SiteContent;
export const warmAccents = ["#d97853", "#86a17a", "#d8a15f"];

const transliterationMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export function slugify(value: string) {
  const transliterated = value
    .toLowerCase()
    .split("")
    .map((character) => transliterationMap[character] ?? character)
    .join("");

  return transliterated
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getApartmentSlug(apartment: Apartment) {
  return slugify(apartment.name);
}

export function getApartmentBySlug(slug: string) {
  return siteContent.apartments.find(
    (apartment) => getApartmentSlug(apartment) === slug,
  );
}

export function createWhatsAppLink(phone: string, message?: string) {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone}${query}`;
}

export function createTelegramLink(handle: string) {
  return `https://t.me/${handle.replace(/^@/, "")}`;
}

export function createTelLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function formatPrice(price: string) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return new Intl.NumberFormat("ru-RU").format(numericPrice);
}

export function createApartmentAvailabilityMessage(name: string) {
  return `Здравствуйте! Хочу узнать о свободных датах для ${name}`;
}

export function createApartmentInquiryMessage(name: string) {
  return `Здравствуйте! Интересует ${name}, хочу узнать свободные даты.`;
}
