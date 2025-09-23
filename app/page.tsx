// @ts-nocheck
// app/page.tsx
import { site } from "./site-data";

export default function Home() {
  const year = new Date().getFullYear();
  const yt = `https://www.youtube.com/embed/${site.videoId}`;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <strong className="text-lg">{site.fullName}</strong>
          <div className="flex gap-3 text-sm">
            <a className="rounded px-3 py-2 hover:bg-neutral-100" href="#hakkimda">
              Hakkımda
            </a>
            <a className="rounded px-3 py-2 hover:bg-neutral-100" href="#projeler">
              Projeler
            </a>
            <a className="rounded px-3 py-2 hover:bg-neutral-100" href="#galeri">
              Galeri
            </a>
            <a className="rounded px-3 py-2 hover:bg-neutral-100" href="#iletisim">
              İletişim
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4">
        {/* HAKKIMDA */}
        <section id="hakkimda" className="scroll-mt-24 py-14">
          <h2 className="mb-3 text-2xl font-semibold">Hakkımda</h2>
          <p className="mb-6 leading-7">{site.about}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <img src={site.profileImage} alt="Profil" className="w-full rounded-xl border" />
            <div className="rounded-xl border p-4">
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
        <section id="projeler" className="scroll-mt-24 py-14">
          <h2 className="mb-3 text-2xl font-semibold">Projeler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {site.projects.map((p, i) => (
              <div key={i} className="rounded-xl border p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mb-2 text-sm text-neutral-700">{p.desc}</p>
                {p.link && (
                  <a
                    className="text-sm underline hover:no-underline"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* GALERİ & VİDEO */}
        <section id="galeri" className="scroll-mt-24 py-14">
          <h2 className="mb-3 text-2xl font-semibold">Galeri &amp; Video</h2>
          <p className="mb-4 text-sm text-neutral-700">
            Aşağıdaki video sayfa içinde <i>gömülü</i> olarak oynar.
          </p>

          <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border">
            <iframe
              src={yt}
              title="Tanıtım"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {site.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Galeri ${i + 1}`}
                className="w-full rounded-xl border"
              />
            ))}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="scroll-mt-24 py-14">
          <h2 className="mb-3 text-2xl font-semibold">İletişim</h2>
          <p className="text-sm">
            Bana{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            adresinden ulaşabilirsin.
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm">
        © {year} {site.fullName} • Öğrenci No: {site.studentNo}
      </footer>
    </>
  );
}
