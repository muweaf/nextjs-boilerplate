// app/site-data.ts
export const site = {
  fullName: "Murat Musa Dimlit",
  studentNo: "2311012705",
  email: "muratdimlit80@gmail.com",

  about:
    "Ben Murat Musa Dimlit, bilgisayar mühendisliği 3. sınıf öğrencisiyim. Web tasarımı ve yazılımla ilgileniyorum. Hobilerim spor yapmak ve futbol oynamak.",

  // YouTube Shorts: sadece ID
  videoId: "ZxG_1-OuiVk",

  socials: { linkedin: "", github: "" },
  projects: [],

  // public/ içine bu dosyaları eklersen görüntülenir
  profileImage: "/profile.jpg",
  gallery: ["/shot-1.jpg", "/shot-2.jpg"],
} as const;
