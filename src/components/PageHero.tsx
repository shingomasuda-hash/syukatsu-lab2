import Image from "next/image";
import { SectionLabel } from "./SectionLabel";

export type HeroIndexItem = { value: string; label: string };

/**
 * 下層ページ共通 Hero。
 * トップ Hero と同じ DNA（斜めのブルー面 / 88px グリッド / 楕円軌道 /
 * アウトライン英字）を持たせつつ、高さは抑える。
 */
export function PageHero({
  label,
  title,
  intro,
  word,
  image,
  index,
}: {
  /** 小さい英字ラベル。例: COMPANIES */
  label: string;
  /** 大きな日本語タイトル。<span> でライム強調可。 */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** 背景の巨大アウトライン英字 */
  word: string;
  image?: { src: string; alt: string };
  /** Hero 下端の指標行 */
  index?: HeroIndexItem[];
}) {
  return (
    <section className="lab-page-hero" data-variant={image ? "image" : "text"}>
      <div className="lab-hero-grid" aria-hidden="true" />
      <div className="lab-orbit lab-orbit-one" aria-hidden="true" />
      <div className="lab-orbit lab-orbit-two" aria-hidden="true" />
      <span className="lab-future-word" aria-hidden="true">
        {word}
      </span>

      <div className="lab-hero-copy">
        <SectionLabel rule>{label} / KANSAI SHUKATSU LAB</SectionLabel>
        <h1>{title}</h1>
        {intro && <p className="lab-intro">{intro}</p>}
      </div>

      {image && (
        <figure className="lab-hero-figure">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1100px) 0px, 40vw"
            className="object-cover"
          />
        </figure>
      )}

      {index && index.length > 0 && (
        <div className="lab-hero-index">
          {index.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
