"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Company } from "@/data/companies";

/**
 * 3D インタビュー・メリーゴーランド。
 *
 * 挙動は既存実装をそのまま保持している。特に以下は変更しないこと。
 *  - 指を右へ動かす(dx > 0)と --orbit-turn が増え、視覚的にも右へ回る
 *  - 感度は PC 0.24 / SP(<761px) 0.38
 *  - 自動回転は 65 秒で 1 周（360 / 65000 deg per ms）
 *  - reduced-motion / タブ非表示 / チェックボックス off / ドラッグ中 /
 *    hover 中 / focus-visible 内包 / ドラッグ後 1400ms は停止
 *  - 横 8px 以上動いたときだけ回転に入り、縦方向はページスクロールに譲る
 *  - ドラッグ直後 500ms のクリックは抑止して誤遷移を防ぐ
 */
export function InterviewCarousel({ companies }: { companies: Company[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stage = root.querySelector<HTMLElement>(".lab-orbit-stage");
    const toggle = root.querySelector<HTMLInputElement>(".lab-rotation-toggle");
    if (!stage || !toggle) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let angle = 0;
    let frame = 0;
    let previous = 0;
    let hover = false;
    let suppressClickUntil = 0;
    let resumeAt = 0;
    let gesture: {
      id: number;
      x: number;
      y: number;
      angle: number;
      direction: "pending" | "horizontal" | "vertical";
    } | null = null;

    const controller = new AbortController();
    const options = { signal: controller.signal };

    const paint = () => root.style.setProperty("--orbit-turn", `${angle}deg`);

    const tick = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (
        !reduced.matches &&
        !document.hidden &&
        toggle.checked &&
        !gesture &&
        !hover &&
        now > resumeAt &&
        !stage.querySelector(":focus-visible")
      ) {
        angle = (angle + (elapsed * 360) / 65000) % 360;
        paint();
      }
      frame = requestAnimationFrame(tick);
    };

    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || gesture) return;
      suppressClickUntil = 0;
      gesture = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        angle,
        direction: "pending",
      };
    };

    const move = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (gesture.direction === "pending") {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
        gesture.direction =
          Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        if (gesture.direction === "horizontal") {
          stage.setPointerCapture(event.pointerId);
          root.dataset.dragging = "true";
        }
      }
      if (gesture.direction !== "horizontal") return;
      event.preventDefault();
      angle = gesture.angle + dx * (window.innerWidth < 761 ? 0.38 : 0.24);
      paint();
    };

    const finish = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      if (gesture.direction === "horizontal") {
        suppressClickUntil = performance.now() + 500;
      }
      gesture = null;
      resumeAt = performance.now() + 1400;
      delete root.dataset.dragging;
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
    };

    stage.addEventListener("pointerdown", down, options);
    stage.addEventListener("pointermove", move, options);
    // capture が確立する前に stage の外で離される場合があるため window でも拾う
    window.addEventListener("pointerup", finish, options);
    window.addEventListener("pointercancel", finish, options);
    stage.addEventListener("lostpointercapture", finish, options);
    stage.addEventListener(
      "click",
      (event) => {
        if (performance.now() < suppressClickUntil) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      { ...options, capture: true },
    );
    stage.addEventListener(
      "dragstart",
      (event) => event.preventDefault(),
      options,
    );
    stage.addEventListener(
      "pointerenter",
      (event) => {
        if (event.pointerType === "mouse") hover = true;
      },
      options,
    );
    stage.addEventListener(
      "pointerleave",
      (event) => {
        if (event.pointerType === "mouse") hover = false;
      },
      options,
    );

    root.dataset.orbitInteractive = "true";
    paint();
    frame = requestAnimationFrame(tick);

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      delete root.dataset.orbitInteractive;
      delete root.dataset.dragging;
      root.style.removeProperty("--orbit-turn");
    };
  }, []);

  const step = 360 / companies.length;
  const toggleId = useId();

  return (
    <div
      className="lab-carousel"
      ref={rootRef}
      role="region"
      aria-label="企業インタビューの回転ギャラリー"
    >
      <input
        type="checkbox"
        id={toggleId}
        className="lab-rotation-toggle"
        defaultChecked
      />
      <label htmlFor={toggleId} className="lab-rotation-label">
        自動回転
      </label>

      <div className="lab-native-orbit-scroll">
        <div className="lab-native-orbit-track">
          <div className="lab-native-orbit-window">
            <div className="lab-orbit-stage">
              <div className="lab-orbit-floor" aria-hidden="true" />
              <div className="lab-orbit-halo" aria-hidden="true" />
              <span className="lab-orbit-backdrop" aria-hidden="true">
                NEXT / PERSPECTIVE
              </span>

              <div className="lab-carousel-ring">
                {companies.map((company, i) => (
                  <article
                    key={company.slug}
                    className="lab-orbit-card"
                    style={
                      { "--card-angle": `${i * step}deg` } as React.CSSProperties
                    }
                  >
                    <Link
                      href={`/companies/${company.slug}`}
                      className="lab-orbit-face"
                    >
                      <div className="lab-orbit-photo">
                        <Image
                          src={company.photo}
                          alt={`${company.personTitle} ${company.personName}氏`}
                          fill
                          sizes="(max-width: 760px) 180px, 320px"
                          className="object-cover"
                          style={{ objectPosition: company.focus }}
                        />
                      </div>
                      <div className="lab-orbit-caption">
                        <p>
                          {company.location} ／ {company.industry}
                        </p>
                        <h3>{company.name}</h3>
                        <span>
                          インタビューを読む
                          <ArrowUpRight
                            width={16}
                            height={16}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="lab-carousel-hint">左右にスワイプで回転 · タップで記事へ</p>
    </div>
  );
}
