import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

function getAmenityIcon(amenity: string) {
  const normalizedAmenity = amenity.toLowerCase();

  if (normalizedAmenity.includes("wi-fi") || normalizedAmenity.includes("wifi")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M2 8.5A16.4 16.4 0 0 1 12 5c3.8 0 7.28 1.3 10 3.5" />
        <path d="M5 12.5A11.44 11.44 0 0 1 12 10c2.7 0 5.15.93 7 2.5" />
        <path d="M8.5 16a6.15 6.15 0 0 1 7 0" />
        <circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("парков")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 20V5h6a4 4 0 1 1 0 8H6" />
        <path d="M6 13h7" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("конди")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="6" width="18" height="6" rx="2" />
        <path d="M7 16c0 1-.67 1.83-1.6 2.24M12 16c0 1-.67 1.83-1.6 2.24M17 16c0 1-.67 1.83-1.6 2.24" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("террас")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 20h16" />
        <path d="M6 20V9l6-4 6 4v11" />
        <path d="M9 20v-5h6v5" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("барбек")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 10a5 5 0 0 0 10 0V8H7v2Z" />
        <path d="M12 15v4" />
        <path d="M9 19h6" />
        <path d="M8 11 6 19M16 11l2 8" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("кух")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 4v16" />
        <path d="M9 4v7a2 2 0 0 1-4 0V4" />
        <path d="M15 4v16" />
        <path d="M19 4c1.1 1.1 1.5 2.7 1.2 4.8-.3 2.13-1.37 3.2-3.2 3.2H15" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("холодиль")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="3.5" width="10" height="17" rx="2" />
        <path d="M7 11.5h10" />
        <path d="M10 8.5v1M10 14.5v1" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("телевиз")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4" y="5" width="16" height="11" rx="2" />
        <path d="M9 19h6" />
        <path d="M12 16v3" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("кровать")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 12.5h16V18" />
        <path d="M5 18v-7h5.5a2.5 2.5 0 0 1 2.5 2.5V18" />
        <path d="M4 18V9" />
        <path d="M18.5 11H20v7" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("ван")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 12h14a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-1a1 1 0 0 1 1-1Z" />
        <path d="M8 18v2M16 18v2M8 12V8a2 2 0 0 1 4 0" />
      </svg>
    );
  }

  if (normalizedAmenity.includes("вход")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 20V6.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 17 6.5V20" />
        <path d="M5 20h14" />
        <path d="M12.5 12.5h.01" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-deep)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-[color:rgba(45,35,27,0.72)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PhotoBlock({
  label,
  accentColor,
  src,
  alt,
  className,
}: {
  label: string;
  accentColor: string;
  src?: string;
  alt: string;
  className?: string;
}) {
  const backgroundStyles: CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, rgba(255, 248, 239, 0.95) 48%, rgba(110, 138, 96, 0.66) 100%)`,
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/60 bg-[var(--surface-strong)] ${className ?? ""}`}
      style={!src ? backgroundStyles : undefined}
    >
      {src ? (
        <Image
          fill
          src={src}
          alt={alt}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,35,27,0.1)_0%,rgba(45,35,27,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.42),_transparent_32%)]" />
      <div className="absolute bottom-4 left-4 rounded-full bg-white/82 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-deep)] backdrop-blur">
        {label}
      </div>
    </div>
  );
}

export function AmenityCard({ amenity }: { amenity: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[24px] border border-[var(--border)] bg-white/80 p-5 shadow-[0_16px_40px_rgba(118,84,63,0.08)] backdrop-blur">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(201,111,77,0.12)] text-[var(--accent-deep)]">
        <span className="h-6 w-6">{getAmenityIcon(amenity)}</span>
      </div>
      <span className="text-base font-medium text-[var(--foreground)]">{amenity}</span>
    </div>
  );
}

export function DetailStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-[var(--border)] bg-white/88 p-4 shadow-[0_18px_44px_rgba(118,84,63,0.09)] backdrop-blur sm:gap-4 sm:rounded-[28px] sm:p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(201,111,77,0.12)] text-[var(--accent-deep)] sm:h-12 sm:w-12">
        <span className="h-6 w-6">{icon}</span>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:rgba(45,35,27,0.55)]">
          {label}
        </p>
        <p className="text-base font-semibold text-[var(--foreground)] sm:text-lg">{value}</p>
      </div>
    </div>
  );
}
