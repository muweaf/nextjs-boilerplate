// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import { site } from "./site-data";

/* Basit reveal animasyonu (yalnızca IntersectionObserver) */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

/* Sayaç animasyonu */
function Counter({ to = 0, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          setVal(Math.round(to * p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
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

export default function Home() {
  const year = new Date().getFullYear();
  const yt = `https://www.youtube.com/embed/${site.videoId}`;

  /* Tema toggle */
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

  /* Aktif menü highlight */
  const sectionIds = ["hakkimda", "one-cikanlar", "yet", "projeler", "timeline", "galeri", "iletisim"];
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { threshold: 0.6 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Kısayol sınıflar */
  const card =
    "rounded-2xl border border-slate-200/60 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:shadow-xl hover:-translate-y-0.5 dark:border-slate-700/60 dark:bg-slate-900/60 dark:shadow-black/30";
  const chip =
    "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800";
  const btn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition";
  const btnPrimary = `${btn} bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-md hover:opacity-95`;
  const btnOutline = `${btn} bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800`;
  const navClass = (id) =>
    `${chip} ${active === id ? "ring-2 ring-indigo-500/40 text-indigo-600 dark:text-indigo-400" : ""}`;

  /* Yetenek ve timeline verileri (örnek) */
  const skills = [
    { name: "React / Next.js", level: 90 },
    { name: "Spring Boot", level: 75 },
    { name: "Node.js", level: 80 },
    { name: "PostgreSQL", level: 70 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Python (Data)", level: 65 },
  ];
  const timeline = [
    { title: "3. Sınıf • Bilgisayar Müh.", desc: "Algoritmalar, ağ, veritabanı projeleri.", when: "2024–2025" },
    { title: "Staj • Web Geliştirme", desc: "React + REST API, admin paneli.", when: "2024 Yaz" },
    { title: "Freelance • Landing Page", desc: "Figma → Next.js + Tailwind canlı.", when: "2023" },
  ];

  return (
    <>
      <div id="top" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur dark:bg-slate-900/70 dark:border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 flex h-14 items-center justify-between">
          <strong className="text-base">Murat Musa Dimlit</strong>
          <div className="flex items-center gap-2 text-sm">
            <a className={navClass("hakkimda")} href="#hakkimda">Hakkımda</a>
            <a className={navClass("one-cikanlar")} href="#one-cikanlar">Öne Çıkanlar</a>
            <a className={navClass("yet")} href="#yet">Yetenekler</a>
            <a className={navClass("projeler")} href="#projeler">Projeler</a>
            <a className={navClass("timeline")} href="#timeline">Zaman Çizelgesi</a>
            <a className={navClass("galeri")} href="#galeri">Galeri</a>
            <a className={navClass("iletisim")} href="#iletisim">İletişim</a>

            {/* Tema Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Tema Değiştir"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
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

            {/* CV indir */}
            <a
              href="/MuratMusaDimlit-CV.pdf"
              download
              className="ml-1 hidden sm:inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
            >
              CV indir
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="border-b bg-gradient-to-r from-slate-100 to-white dark:from-slate-900 dark:to-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
            <Reveal delay={50}>
              <div className="grow">
                <h1 className="mb-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                    Merhaba, ben {site.fullName}
                  </span>
                </h1>
                <p className="max-w-2xl text-slate-700 dark:text-slate-300">{site.about}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="#projeler" className={btnPrimary}>Projeleri Gör</a>
                  <a href="#iletisim" className={btnOutline}>İletişime Geç</a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="shrink-0">
                {site.profileImage ? (
                  <img
                    src={site.profileImage}
                    alt="Profil"
                    className="h-28 w-28 rounded-2xl border object-cover shadow-md ring-2 ring-white/60 dark:ring-slate-800"
                  />
                ) : (
                  <div className="grid h-28 w-28 place-items-center rounded-2xl border bg-slate-200 font-semibold shadow-md dark:bg-slate-700">
                    {site.fullName.split(" ").map(w => w[0]).slice(0,2).join("")}
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
          <h2 className="mb-4 text-2xl font-semibold">Hakkımda</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <article className={`${card} p-5`}>
                <h3 className="mb-2 text-lg font-semibold">Kısa Öz</h3>
                <p className="leading-7 text-slate-700 dark:text-slate-300">{site.about}</p>
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
                <h3 className="mb-2 text-lg font-semibold">İlgi Alanları</h3>
                <ul className="list-disc space-y-1 pl-5 text-slate-700 dark:text-slate-300">
                  <li>Frontend (React/Next.js)</li>
                  <li>Backend (Spring Boot, Node.js)</li>
                  <li>Veri Analizi (Python, Jupyter)</li>
                </ul>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ÖNE ÇIKANLAR */}
        <section id="one-cikanlar" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold">Öne Çıkanlar</h2>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { n: 12, t: "Mini Proje" },
                { n: 6, t: "Teknoloji" },
                { n: 3, t: "Takım Çalışması" },
              ].map((x, i) => (
                <div key={i} className={`${card} p-6 text-center`}>
                  <div className="text-3xl font-extrabold">
                    <Counter to={x.n} />+
                  </div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{x.t}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* YETENEKLER */}
        <section id="yet" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold">Yetenekler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal delay={i * 60} key={s.name}>
                <div className={`${card} p-5`}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">{s.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJELER */}
        <section id="projeler" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">Projeler</h2>
          {site.projects?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <Reveal delay={i * 60} key={i}>
                  <article className={`${card} group p-5`}>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{p.desc}</p>
                    <div className="mt-3">
                      {p.link ? (
                        <a href={p.link} target="_blank" className={btnOutline}>GitHub</a>
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
              <div className={`${card} p-6 text-sm text-slate-600 dark:text-slate-300`}>
                Projeler yakında eklenecek. Şimdilik profil ve galeriye göz atabilirsin. 👇
              </div>
            </Reveal>
          )}
        </section>

        {/* ZAMAN ÇİZELGESİ */}
        <section id="timeline" className="scroll-mt-24 py-12">
          <h2 className="mb-6 text-2xl font-semibold">Zaman Çizelgesi</h2>
          <div className="relative ml-3">
            <div className="absolute left-0 top-0 h-full w-px bg-slate-300 dark:bg-slate-700" />
            <div className="space-y-6 pl-6">
              {timeline.map((t, i) => (
                <Reveal delay={i * 60} key={i}>
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" />
                    <div className={`${card} p-4`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{t.title}</h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{t.when}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{t.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GALERİ & VİDEO */}
        <section id="galeri" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">Galeri &amp; Video</h2>
          <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(site.gallery ?? []).map((src, i) => (
              <Reveal delay={i * 60} key={i}>
                <div className="group relative overflow-hidden rounded-2xl border shadow-md dark:border-slate-700">
                  <img
                    src={src}
                    alt={`Galeri ${i + 1}`}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">İletişim</h2>
          <Reveal>
            <div className={`${card} p-5`}>
              <p className="text-sm">
                Bana{" "}
                <a className="underline decoration-indigo-500 underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>{" "}
                adresinden ulaşabilirsin.
              </p>
              <div className="mt-3 flex gap-2">
                {site.socials?.linkedin && (
                  <a className={btnOutline} href={site.socials.linkedin} target="_blank">LinkedIn</a>
                )}
                {site.socials?.github && (
                  <a className={btnOutline} href={site.socials.github} target="_blank">GitHub</a>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* GELİŞMİŞ FOOTER */}
      <footer className="mt-16 border-t bg-white/70 backdrop-blur dark:bg-slate-900/70 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto h-1 w-full bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 rounded-full my-6" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 py-6">
            <div>
              <h4 className="font-semibold">Hakkımda</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {site.fullName} — Web geliştirme, backend ve veri analizi ile ilgileniyorum.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Bağlantılar</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a className="hover:underline" href="#hakkimda">Hakkımda</a></li>
                <li><a className="hover:underline" href="#projeler">Projeler</a></li>
                <li><a className="hover:underline" href="#timeline">Zaman Çizelgesi</a></li>
                <li><a className="hover:underline" href="#iletisim">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">İletişim</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a className="hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
                <li>Öğrenci No: {site.studentNo}</li>
              </ul>
              <div className="mt-3 flex gap-2">
                {site.socials?.linkedin && <a className={chip} href={site.socials.linkedin} target="_blank">LinkedIn</a>}
                {site.socials?.github && <a className={chip} href={site.socials.github} target="_blank">GitHub</a>}
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Bülten</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Yeni projelerden haberdar ol.</p>
              <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="e-posta adresin"
                  className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
                />
                <button className={btnPrimary} type="submit">Kaydol</button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-between border-top py-4 text-xs text-slate-600 dark:text-slate-400">
            <span>© {year} {site.fullName} • Öğrenci No: {site.studentNo}</span>
            <a href="#top" className="rounded-full border px-3 py-1 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Yukarı çık</a>
          </div>
        </div>
      </footer>
    </>
  );
}
