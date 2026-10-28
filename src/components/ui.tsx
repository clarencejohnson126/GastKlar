import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { AddonKey } from "@/modules/leads/schema";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-control px-6 py-3 text-center text-sm font-semibold transition-colors duration-200 ease-soft";

const buttonVariants = {
  primary: "bg-ocean text-white hover:bg-ocean-deep",
  secondary: "border-2 border-ocean bg-white text-ocean hover:bg-ice",
  inverse: "bg-white text-ocean hover:bg-ice",
} as const;

export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export const submitButtonClass = `${buttonBase} ${buttonVariants.primary} disabled:cursor-wait disabled:bg-ocean-deep`;

export function Section({
  id,
  tone = "white",
  labelledBy,
  children,
}: {
  id?: string;
  tone?: "white" | "ice" | "ocean";
  labelledBy?: string;
  children: ReactNode;
}) {
  const tones = { white: "bg-white", ice: "bg-ice", ocean: "on-ocean bg-ocean text-white" };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-16 lg:py-24`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function H2({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`text-xl-compact font-extrabold tracking-tight md:text-2xl ${className}`}>
      {children}
    </h2>
  );
}

const paths: Record<AddonKey | "check" | "menu" | "close", ReactNode> = {
  keys: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 12.2 20 3m-3 3 2.5 2.5M14 9l2 2" />
    </>
  ),
  guestCommunication: <path d="M4 5h16v11H9l-5 4z" />,
  laundry: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M7 6.5h2" />
    </>
  ),
  repairs: <path d="M15 4a5 5 0 0 0-4.6 6.9L4 17.3V20h2.7l6.4-6.4A5 5 0 0 0 20 9l-3 1-2-2 1-3z" />,
  renovation: (
    <>
      <rect x="4" y="3" width="13" height="6" rx="1.5" />
      <path d="M17 6h3v5h-8v3" />
      <rect x="10.5" y="14" width="3" height="7" rx="1" />
    </>
  ),
  hostDashboard: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 14v-3m5 3V8m5 6v-5M8 21h8" />
    </>
  ),
  shortNotice: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  other: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, className = "size-6" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-pill bg-ocean text-white">
            <Icon name="check" className="size-4" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageIntro({
  title,
  intro,
  children,
  image,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <div className="bg-ice py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          <h1 className="text-statement font-extrabold tracking-tight">{title}</h1>
          <p className="mt-6 max-w-prose text-lg text-muted">{intro}</p>
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-hero lg:col-span-5">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
