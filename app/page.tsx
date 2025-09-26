// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { site } from "./site-data";

/** Görünür olduğunda yumuşak giriş animasyonu */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Basit sayaç */
function Counter({ to = 0, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.round(to * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

/** Dış linkleri güvenli hale getirir (https ekler) */
const abs = (u?: string) => {
  if (!u) return undefined;
  if (/^(https?:)?\/\//i.test(u)) return u;
  if (u.startsWith("mailto:")) return u;
  return `https://${u.replace(/^\/+/, "")}`;
};

export default function Home() {
  const year = new Date().getFullYear();
  const yt = `https://www.youtube.com/embed/${site?.videoId ?? ""}`;

  /** Tema */
  const [theme, setTheme] = useState(() =>
    typeof window === "undefined"
      ? "light"
      : document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /** Nav aktif takibi */
  const sectionIds = [
    "hakkimda",
    "one-cikanlar",
    "kutu",
    "projeler",
    "yol",
    "galeri",
    "iletisim",
  ];
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => e.isIntersecting && setActive(id),
        { threshold: 0.6 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /** Sık kullanılan sınıflar */
  const cardBase =
    "rounded-2xl border bg-white/80 backdrop-blur transition-all duration-300 will-change-transform shadow-lg " +
    "dark:bg-slate-900/70 dark:border-slate-700/60 dark:shadow-black/30";
  const cardHover =
    "hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-300/40 dark:hover:shadow-emerald-900/40";
  const card = `${cardBase} border-slate-200/70 ${cardHover}`;

  const chip =
    "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium " +
    "hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800";

  const btn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition";
  const btnPri = `${btn} bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-md hover:opacity-95`;
  const btnOut = `${btn} bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800`;

  const navCls = (id: string) =>
    `${chip} ${
      active === id
        ? "ring-2 ring-emerald-500/40 text-emerald-700 dark:text-emerald-300"
        : ""
    }`;

  /** İçerik verileri (Yeni bölümler) */
  const toolGroups = [
    { title: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "Vite"] },
    { title: "Backend", items: ["Spring Boot", "Node.js", "Express"] },
    { title: "Veritabanı", items: ["PostgreSQL", "MongoDB"] },
    { title: "Araçlar", items: ["Git", "Vercel", "Postman", "Figma"] },
  ];

  const roadmap = {
    now: ["Portfolyoya blog ve arama", "JWT ile auth demo", "Unit test örnekleri"],
    next: ["Docker ve konteyner mantığı", "CI/CD pipeline örneği", "Spring Security"],
    later: ["Mobil (React Native)", "GraphQL", "AWS temelleri"],
  };

  return (
    <div className="bg-emerald-50/60 dark:bg-slate-950 min-h-screen">
      <div id="top" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-emerald-100/70 bg-emerald-50/70 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 flex h-14 items-center justify-between">
          <strong className="text-base text-emerald-700 dark:text-emerald-300">
            {site?.fullName ?? "Murat Musa Dimlit"}
          </strong>
          <div className="flex items-center gap-2 text-sm">
            <a className={navCls("hakkimda")} href="#hakkimda">Hakkımda</a>
            <a className={navCls("one-cikanlar")} href="#one-cikanlar">Öne Çıkanlar</a>
            <a className={navCls("kutu")} href="#kutu">Araç Kutum</a>
            <a className={navCls("projeler")} href="#projeler">Projeler</a>
            <a className={navCls("yol")} href="#yol">Yol Haritası</a>
            <a className={navCls("galeri")} href="#galeri">Galeri</a>
            <a className={navCls("iletisim")} href="#iletisim">İletişim</a>

            {/* Tema */}
            <button
              onClick={toggleTheme}
              aria-label="Tema"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800"
              title="Tema"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-amber-400">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 4V1h0v3zm0 19v-3h0v3zM21 12h3v0h-3zM1 12h3v0H1zM17.24 4.84l1.42 1.42 1.79-1.8-1.41-1.41-1.8 1.79zM4.24 19.76l1.42-1.42-1.8-1.79-1.41 1.41 1.79 1.8zM12 7a5 5 0 100 10 5 5 0 000-10z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" className="fill-slate-600 dark:fill-slate-200">
                  <path d="M21.64 13a9 9 0 01-11.3-11A9 9 0 1021.64 13z"/>
                </svg>
              )}
            </button>

            {/* (Varsa) CV */}
            {site?.cvUrl && (
              <a
                href={site.cvUrl}
                download
                className="ml-1 hidden sm:inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800"
              >
                CV indir
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="border-b bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-slate-900 dark:to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
            <Reveal delay={50}>
              <div className="grow">
                <h1 className="mb-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-lime-500 to-teal-500 bg-clip-text text-transparent">
                    Merhaba, ben {site?.fullName ?? "Murat Musa Dimlit"}
                  </span>
                </h1>
                <p className="max-w-2xl text-slate-800 dark:text-slate-300">
                  {site?.about ?? ""}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="#projeler" className={btnPri}>Projeleri Gör</a>
                  <a href="#iletisim" className={btnOut}>İletişime Geç</a>
                </div>
              </div>
            </Reveal>

            {/* Profil: fullName boş olsa bile güvenli fallback (MM) */}
            <Reveal>
              <div className="shrink-0">
                {site?.profileImage ? (
                  <img
                    src={site.profileImage}
                    alt="Profil"
                    className="h-28 w-28 rounded-2xl border object-cover shadow-md ring-2 ring-white/60 dark:ring-slate-800"
                  />
                ) : (
                  <div className="grid h-28 w-28 place-items-center rounded-2xl border bg-emerald-200 font-semibold shadow-md dark:bg-slate-700">
                    {(() => {
                      const name = (site?.fullName ?? "").trim();
                      const letters = name
                        ? name.split(/\s+/).map((p) => (p && p[0]) || "").join("")
                        : "MM";
                      return (letters || "MM").slice(0, 2).toUpperCase();
                    })()}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* HAKKIMDA */}
        <section id="hakkimda" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Hakkımda</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <article className={`${card} p-5`}>
                <h3 className="mb-2 text-lg font-semibold text-emerald-700 dark:text-emerald-300">Kısa Öz</h3>
                <p className="leading-7 text-slate-800 dark:text-slate-300">
                  {site?.about ?? ""}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={chip}>React/Next.js</span>
                  <span className={chip}>Spring Boot</span>
                  <span className={chip}>Node.js</span>
                  <span className={chip}>Python</span>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className={`${card} p-5`}>
                <h3 className="mb-2 text-lg font-semibold text-emerald-700 dark:text-emerald-300">Hızlı Not</h3>
                <p className="text-sm text-slate-800 dark:text-slate-300">
                  Aşağıda Araç Kutum ve Yol Haritası bölümlerini bulabilirsin.
                </p>
                <div className="mt-3 flex gap-2">
                  <a href="#kutu" className={btnOut}>Araç Kutum</a>
                  <a href="#yol" className={btnOut}>Yol Haritası</a>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ÖNE ÇIKANLAR */}
        <section id="one-cikanlar" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Öne Çıkanlar</h2>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {[{ n: 12, t: "Mini Proje" }, { n: 6, t: "Teknoloji" }, { n: 3, t: "Takım Çalışması" }].map((x, i) => (
                <div key={i} className={`${card} p-6 text-center`}>
                  <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    <Counter to={x.n} />+
                  </div>
                  <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">{x.t}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ARAÇ KUTUSU */}
        <section id="kutu" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Araç Kutum</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {toolGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 70}>
                <article className={`${card} p-5`}>
                  <div className="mb-1 text-sm text-slate-500 dark:text-slate-400">Kategori</div>
                  <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{g.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className={chip}>{it}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-xs dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-2 font-semibold text-emerald-700 dark:text-emerald-300">Favori Kombinasyon</div>
              <pre className="overflow-auto">
                <code>{`# Frontend
Next.js + Tailwind CSS
# Backend
Spring Boot / Node.js (Express)
# Deploy
Vercel (frontend) • Render/Railway (backend)`}</code>
              </pre>
            </div>
          </Reveal>
        </section>

        {/* PROJELER */}
        <section id="projeler" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Projeler</h2>
          {site?.projects?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <Reveal delay={i * 60} key={i}>
                  <article className={`${card} group p-5`}>
                    <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-800 dark:text-slate-300">{p.desc}</p>
                    <div className="mt-3">
                      {p.link ? (
                        <a href={abs(p.link)} target="_blank" rel="noreferrer" className={btnOut}>
                          GitHub
                        </a>
                      ) : (
                        <span className={chip}>Repo yakında</span>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className={`${card} p-6 text-sm text-slate-700 dark:text-slate-300`}>
                Projeler yakında eklenecek. Şimdilik profil ve galeriye göz atabilirsin. 👇
              </div>
            </Reveal>
          )}
        </section>

        {/* YOL HARİTASI */}
        <section id="yol" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">Yol Haritası</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Şimdi", color: "from-emerald-500 to-teal-500", items: roadmap.now },
              { title: "Sırada", color: "from-lime-500 to-emerald-500", items: roadmap.next },
              { title: "Sonra", color: "from-teal-500 to-emerald-600", items: roadmap.later },
            ].map((col, i) => (
              <Reveal delay={i * 80} key={col.title}>
                <div className={`${card} p-4`}>
                  <div className={`mb-3 inline-flex rounded-full bg-gradient-to-r ${col.color} px-3 py-1 text-xs font-semibold text-white`}>
                    {col.title}
                  </div>
                  <ul className="space-y-2 text-sm">
                    {col.items.map((t) => (
                      <li key={t} className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

       {/* GALERİ & VİDEO */}
<section id="galeri" className="scroll-mt-24 py-12">
  <h2 className="mb-4 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
    Galeri &amp; Video
  </h2>
  <p className="mb-3 text-sm text-slate-800 dark:text-slate-300">
    Aşağıdaki video sayfa içinde <i>gömülü</i> olarak oynar.
  </p>

  <Reveal>
    <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border shadow-lg dark:border-slate-700">
      <iframe
        src={yt}
        title="Tanıtım"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  </Reveal>

  {/* --- GALERİ: düzgün kırpma + sabit oran + hover --- */}
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {(site?.gallery ?? []).map((src, i) => (
      <Reveal delay={i * 60} key={i}>
        <figure className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white/40 shadow-lg transition-all dark:border-slate-700">
          {/* Görsel için sabit 4/3 oranlı kutu */}
          <div className="aspect-[4/3] w-full">
            <img
              src={src}
              alt={`Galeri ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </figure>
      </Reveal>
    ))}
  </div>
</section>


        {/* İLETİŞİM */}
        <section id="iletisim" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold text-emerald-700 dark:text-emerald-300">İletişim</h2>
          <Reveal>
            <div className={`${card} p-5`}>
              <p className="text-sm text-slate-800 dark:text-slate-300">
                Bana{" "}
                <a className="underline decoration-emerald-600 underline-offset-4" href={abs(`mailto:${site?.email ?? ""}`)}>
                  {site?.email ?? ""}
                </a>{" "}
                adresinden ulaşabilirsin.
              </p>
              <div className="mt-3 flex gap-2">
                {site?.socials?.linkedin && (
                  <a className={btnOut} href={abs(site.socials.linkedin)} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
                {site?.socials?.github && (
                  <a className={btnOut} href={abs(site.socials.github)} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* DALGA AYRAÇ + FOOTER (bülten yok) */}
      <div className="relative mt-20">
        <svg viewBox="0 0 1440 120" className="absolute inset-x-0 -top-12 w-full">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#g)"
            fillOpacity="0.12"
            d="M0,64L48,80C96,96,192,128,288,117.3C384,107,480,53,576,53.3C672,53,768,107,864,122.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <footer className="border-t bg-emerald-50/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-2 text-sm text-emerald-700/80 dark:text-emerald-300/80">Ben kimim?</div>
              <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
                {site?.fullName ?? "Murat Musa Dimlit"}
              </h4>
              <p className="mt-2 text-sm text-slate-800 dark:text-slate-300">
                Web geliştirme (Next.js), backend (Spring/Node) ve veri analizi ile ilgileniyorum.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Staj/part-time fırsatlara açığım
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm text-emerald-700/80 dark:text-emerald-300/80">Kısayollar</div>
              <div className="flex flex-wrap gap-2">
                <a className={chip} href="#hakkimda">Hakkımda</a>
                <a className={chip} href="#kutu">Araç Kutum</a>
                <a className={chip} href="#yol">Yol Haritası</a>
                <a className={chip} href="#projeler">Projeler</a>
                <a className={chip} href="#galeri">Galeri</a>
                <a className={chip} href="#iletisim">İletişim</a>
              </div>
            </div>

            <div>
              <div className="mb-2 text-sm text-emerald-700/80 dark:text-emerald-300/80">Kodu gör</div>
              <div className="overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-900">
                <pre className="overflow-auto">
                  <code>{`# Bu portfolyo Next.js + Tailwind ile yazıldı
git clone <repo-URL>
cd project && npm i && npm run dev`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t pt-4 text-xs text-slate-700 dark:text-slate-400 sm:flex-row">
            <span>
              © {year} {site?.fullName ?? "Murat Musa Dimlit"} • Öğrenci No: {site?.studentNo ?? "—"}
            </span>
            <div className="flex gap-2">
              {site?.socials?.linkedin && (
                <a className={chip} href={abs(site.socials.linkedin)} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
              {site?.socials?.github && (
                <a className={chip} href={abs(site.socials.github)} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              <a href="#top" className="rounded-full border px-3 py-1 hover:bg-emerald-100 dark:border-slate-700 dark:hover:bg-slate-800">
                Yukarı
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
