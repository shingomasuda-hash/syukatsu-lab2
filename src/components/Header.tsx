"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // スクロール位置に応じて背景を敷く
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ルート遷移でドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ドロワーを開いている間は背面をスクロールさせない
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="lab-header" data-scrolled={scrolled || open}>
        <div className="lab-header-inner">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative inline-block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/40 md:h-10 md:w-10">
              <Image
                src="/images/logo.png"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-medium tracking-wide text-white md:text-base">
                {SITE.name}
              </span>
              <span
                className="hidden text-[10px] tracking-[0.2em] text-white/70 md:block"
                style={{ fontFamily: "var(--font-label)" }}
              >
                {SITE.nameEn}
              </span>
            </span>
          </Link>

          <nav className="lab-nav" aria-label="メインメニュー">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.line}
              target="_blank"
              rel="noopener noreferrer"
              className="lab-line-button"
            >
              公式LINE
            </a>
            <button
              type="button"
              className="lab-burger"
              aria-expanded={open}
              aria-controls="lab-drawer"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X width={20} height={20} aria-hidden="true" />
              ) : (
                <Menu width={20} height={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="lab-drawer" id="lab-drawer">
          <nav aria-label="メインメニュー">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
                <em>{item.en}</em>
              </Link>
            ))}
          </nav>
          <a
            href={SITE.line}
            target="_blank"
            rel="noopener noreferrer"
            className="lab-button lab-button-lime"
            style={{ display: "flex", width: "100%" }}
          >
            公式LINEで受け取る
            <ArrowUpRight width={20} height={20} aria-hidden="true" />
          </a>
        </div>
      )}
    </>
  );
}
