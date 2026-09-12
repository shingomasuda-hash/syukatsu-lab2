import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="lab-footer">
      <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
      <div className="lab-footer-top">
        <div>
          <h2>{SITE.name}</h2>
          <p className="lab-footer-lead">
            関西の就活生へ、まだ知らない企業との出会いを。
          </p>
        </div>

        <div className="lab-footer-col">
          <h3>SITEMAP</h3>
          <Link href="/">トップ</Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="lab-footer-col">
          <h3>OTHERS</h3>
          <a href={SITE.line} target="_blank" rel="noopener noreferrer">
            公式LINE
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <Link href="/for-companies">掲載・取材のご相談</Link>
        </div>
      </div>

      <div className="lab-footer-bottom">
        <span>© 2026 {SITE.name}</span>
        <span>{SITE.nameEn}</span>
      </div>
    </footer>
  );
}
