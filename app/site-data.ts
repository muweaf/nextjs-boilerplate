// app/site-data.ts
export type Project = { title: string; desc: string; link?: string };

export const site = {
  fullName: "Murat Musa Dimlit",
  studentNo: "2311012705",
  email: "muratdimlit80@gmail.com",
  videoId: "ZxG_1-OuiVk",

  // Profil görselin yoksa boş bırakabilirsin; kod baş harfleri gösteriyor.
  profileImage: "",

  // Kısa Öz’de görünmesini istediğin metin
  about:
    "Bilgisayar mühendisliği 3. sınıf öğrencisiyim; yazılımla ilgileniyorum, özellikle nesneye yönelik dillerle çalışıyorum. Hobilerim arasında spor yapmak ve vücut geliştirmek var.",

  socials: {
    github: "https://github.com/muweaf",
    linkedin: "" // varsa ekleyebilirsin
  },

  projects: [
    // { title: "Projeye örnek", desc: "Kısa açıklama", link: "https://github.com/muweaf/..." }
  ],

  // 🔽 Fotoğraflarını public/gallery altına koyduğun adlarla, başında / olacak
  gallery: [
    "/gallery/gym-1.jpeg",
    "/gallery/gym-2.jpeg",
    "/gallery/gym-3.jpeg"
  ],
} as const;
