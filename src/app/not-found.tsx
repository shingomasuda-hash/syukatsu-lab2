import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="lab-page-hero">
      <div className="lab-hero-grid" aria-hidden="true" />
      <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
      <span className="lab-future-word" aria-hidden="true">
        404
      </span>
      <div className="lab-hero-copy">
        <p className="lab-label">
          <span className="lab-label-rule" aria-hidden="true" />
          NOT FOUND / KANSAI SHUKATSU LAB
        </p>
        <h1>
          このページは、
          <br />
          <span>見つかりませんでした。</span>
        </h1>
        <p className="lab-intro">
          URLが変わったか、削除された可能性があります。
        </p>
        <Link href="/" className="lab-button lab-button-lime">
          トップへ戻る
          <ArrowUpRight width={20} height={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
