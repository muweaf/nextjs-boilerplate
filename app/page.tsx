// @ts-nocheck
import { site } from "./site-data";

export default function Home() {
  const year = new Date().getFullYear();
  const yt = `https://www.youtube.com/embed/${site.videoId}`;

  // Tek yerden stil kısayolları (sadece Tailwind sınıfları)
  const card =
    "rounded-2xl border border-slate-200/60 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:shadow-xl hover:-translate-y-0.5";
  const chip =
    "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium hover:bg-slate-50";
  const btn = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition";
  const btnPrimary = `${btn} bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-md hover:opacity-95`;
  const btnOutline = `${btn} bg-white text-slate-900 border border-slate-200 hover:bg-slate-50`;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 flex h-14 items-center justify-between">
          <strong className="text-base">Murat Musa Dimlit</strong>
          <div className="flex gap-1 text-sm">
            <a className={chip} href="#hakkimda">Hakkımda</a>
            <a className={chip} href="#projeler">Projeler</a>
            <a className={chip} href="#galeri">Galeri</a>
            <a className={chip} href="#iletisim">İletişim</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="border-b bg-gradient-to-r from-slate-100 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center">
            <div className="grow">
              <h1 className="mb-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                  Merhaba, ben {site.fullName}
                </span>
              </h1>
              <p className="max-w-2xl text-slate-700">{site.about}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="#projeler" className={btnPrimary}>Projeleri Gör</a>
                <a href="#iletisim" className={btnOutline}>İletişime Geç</a>
              </div>
            </div>

            <div className="shrink-0">
              {site.profileImage ? (
                <img
                  src={site.profileImage}
                  alt="Profil"
                  className="h-28 w-28 rounded-2xl border object-cover shadow-md ring-2 ring-white/60"
                />
              ) : (
                <div className="grid h-28 w-28 place-items-center rounded-2xl border bg-slate-200 font-semibold shadow-md">
                  {site.fullName.split(" ").map(w => w[0]).slice(0,2).join("")}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* HAKKIMDA */}
        <section id="hakkimda" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">Hakkımda</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <article className={`${card} p-5`}>
              <h3 className="mb-2 text-lg font-semibold">Kısa Öz</h3>
              <p className="leading-7">{site.about}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={chip}>React/Next.js</span>
                <span className={chip}>Spring Boot</span>
                <span className={chip}>Node.js</span>
                <span className={chip}>Python</span>
              </div>
            </article>

            <article className={`${card} p-5`}>
              <h3 className="mb-2 text-lg font-semibold">İlgi Alanları</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Frontend (React/Next.js)</li>
                <li>Backend (Spring Boot, Node.js)</li>
                <li>Veri Analizi (Python, Jupyter)</li>
              </ul>
            </article>
          </div>
        </section>

        {/* PROJELER */}
        <section id="projeler" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">Projeler</h2>
          {site.projects?.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <article key={i} className={`${card} group p-5`}>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{p.desc}</p>
                  <div className="mt-3">
                    {p.link ? (
                      <a href={p.link} target="_blank" className={btnOutline}>GitHub</a>
                    ) : (
                      <span className={chip}>Repo yakında</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={`${card} p-6 text-sm text-slate-600`}>
              Projeler yakında eklenecek. Şimdilik profil ve galeriye göz atabilirsin. 👇
            </div>
          )}
        </section>

        {/* GALERİ & VİDEO */}
        <section id="galeri" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">Galeri &amp; Video</h2>
          <p className="mb-3 text-sm text-slate-700">
            Aşağıdaki video sayfa içinde <i>gömülü</i> olarak oynar.
          </p>

          <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border shadow-lg">
            <iframe
              src={yt}
              title="Tanıtım"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(site.gallery ?? []).map((src, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border shadow-md">
                <img
                  src={src}
                  alt={`Galeri ${i + 1}`}
                  className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="scroll-mt-24 py-12">
          <h2 className="mb-4 text-2xl font-semibold">İletişim</h2>
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
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t py-6 text-center text-sm text-slate-600">
        © {year} {site.fullName} • Öğrenci No: {site.studentNo}
      </footer>
    </>
  );
}
