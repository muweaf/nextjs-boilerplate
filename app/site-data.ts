// app/site-data.ts
export const site = {
  fullName: "Murat Musa Dimlit",
  studentNo: "2311012705",
  email: "muratdimlit80@gmail.com",

  // HAKKIMDA / KISA ÖZ
  about:
    "Bilgisayar mühendisliği 3. sınıf öğrencisiyim. Yazılımla ilgileniyorum; özellikle nesneye yönelik dillerle (OOP) çalışıyorum. Hobilerim arasında spor yapmak ve vücut geliştirmek var.",

  // Sayfaya gömülü oynatılan YouTube videosu (istersen değiştir)
  videoId: "ZxG_1-OuiVk",

  // Profil fotoğrafı (boş bırakabilirsin, baş harfli avatar çıkar)
  profileImage: "",

  // İstersen CV ekleyebilirsin (public içine PDF koyup /MuratMusaDimlit-CV.pdf gibi ver)
  cvUrl: "",

  socials: {
    github: "https://github.com/muweaf",
    linkedin: "", // varsa ekle
  },

  projects: [
    {
      title: "Kişisel Blog",
      desc: "Next.js + Tailwind ile minimal blog",
      link: "", // repo linkin varsa ekle
    },
    {
      title: "API Demo",
      desc: "Node/Express denemeleri",
      link: "", // repo linkin varsa ekle
    },
  ],

  // GALERİ — aşağıdaki dosyalar public/ klasöründe olmalı
  gallery: [
    "/gallery/gym-1.jpg",
    "/gallery/gym-2.jpg",
    "/gallery/gym-3.jpg",
  ],
} as const;
