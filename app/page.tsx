// @ts-nocheck
import { site } from "./site-data";

export default function Home() {
  const year = new Date().getFullYear();
  const yt = `https://www.youtube.com/embed/${site.videoId}`;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <strong className="text-base">{site.fullName}</strong>
          <div className="flex gap-1 text-sm">
            <a className="chip hover:bg-slate-50" href="#hakkimda">Hakkımda</a>
            <a className="chip hover:bg-slate-50" href="#projeler">Projeler</a>
            <a className="chip hover:bg-slate-50" href="#galeri">Galeri</a>
            <a className="chip hover:bg-slate-50" href="#iletisim">İletişim</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="border-b bg-gradient-to-r from-slate-100 to-white">
        <div className="container py-10">
          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center">
            <div className="grow">
              <h1 className="mb-2 text-3xl font-bold">Merhaba, ben {site.fullName}</h1>
              <p className="max-w-2xl text-slate-700">
                {site.about}
              </p>
              <div className="mt-4 flex gap-2">
                <a href="#projeler" className="btn-primary">Projeleri Gör</a>
                <a href="#iletisim" className="btn-outline">İletişime Geç</a>
              </div>
            </div>
            <div className="shrink-0">
              {/* Profil görseli yoksa baş harfler */}
              {site.profileImage ? (
                <img
                  src={site.profileImage}
                  alt="Profil"
                  className="h-28 w-28 rounded-2xl border object-cover shadow-sm"
                />
              ) : (
                <div className="grid h-28 w-28 place-items-center rounded-2xl border bg-slate-200 font-semibold shadow-sm">
                  {site.fullName.split(" ").map(w => w[0]).slice(0,2).join("")}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {/* HAKKIMDA */}
        <section id="hakkimda" className="scroll-mt-24 py-12">
          <h2 className="section-title">Hakkımda</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-4">
              <h3 className="mb-2 text-lg font-semibold">Kısa Öz</h3>
              <p className="leading-7">
                {site.about}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">React/Next.js</span>
                <span className="chip">Spring Boot</span>
                <span className="chip">Node.js</span>
                <span className="chip">Python</span>
              </div>
            </div>

            <div className="card p-4">
              <h3 className="mb-2 text-lg font-semibold">İlgi Alanları</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Frontend (React/Next.js)</li>
                <li>Backend (Spring Boot, Node.js)</li>
                <li>Veri Analizi (Python, Jupyter)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJELER */}
        <section id="projeler" className="scroll-mt-24 py-12">
          <h2 className="section-title">Projeler</h2>
          {site.projects?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {site.projects.map((p, i) => (
                <article key={i} className="card p-4 hover:shadow-md transition">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{p.desc}</p>
                  <div className="mt-3">
                    {p.link ? (
                      <a href={p.link} target="_blank" className="btn-outline">GitHub</a>
                    ) : (
                      <span className="chip">Repo yakında</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card p-6 text-sm text-slate-600">
              Projeler yakında eklenecek. Şimdilik profil ve galeriye göz atabilirsin. 👇
            </div>
          )}
        </section>

        {/* GALERİ & VİDEO */}
        <section id="galeri" className="scroll-mt-24 py-12">
          <h2 className="section-title">Galeri &amp; Video</h2>
          <p className="mb-3 text-sm text-slate-700">
            Aşağıdaki video sayfa içinde <i>gömülü</i> olarak oynar.
          </p>

          <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border shadow-sm">
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
              <img
                key={i}
                src={src}
                alt={`Galeri ${i + 1}`}
                className="h-52 w-full rounded-2xl border object-cover shadow-sm transition hover:scale-[1.01]"
              />
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="scroll-mt-24 py-12">
          <h2 className="section-title">İletişim</h2>
          <div className="card p-5">
            <p className="text-sm">
              Bana{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              adresinden ulaşabilirsin.
            </p>
            <div className="mt-3 flex gap-2">
              {site.socials?.linkedin && (
                <a className="btn-outline" href={site.socials.linkedin} target="_blank">LinkedIn</a>
              )}
              {site.socials?.github && (
                <a className="btn-outline" href={site.socials.github} target="_blank">GitHub</a>
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
