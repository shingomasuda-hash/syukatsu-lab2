import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

/** Footer 直前に置く共通 CTA */
export function PageCTA({
  label = "NEXT CONNECTION",
  title,
  href,
  cta,
}: {
  label?: string;
  title: React.ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <section className="lab-cta">
      <div className="lab-hero-grid" aria-hidden="true" />
      <div className="lab-cta-inner">
        <div>
          <SectionLabel rule>{label}</SectionLabel>
          <h2>{title}</h2>
        </div>
        <Link href={href} className="lab-button lab-button-lime">
          {cta}
          <ArrowUpRight width={20} height={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
