export const site = {
  fullName: "Murat Musa Dimlit",
  studentNo: "2311012705",
  email: "muratdimlit80@gmail.com",
  videoId: "ZxG_1-OuiVk", // Youtube video ID
  profileImage: "",       // public/ altındaki bir görsel ya da tam URL (boş kalabilir)
  cvUrl: "",              // public/MuratMusaDimlit-CV.pdf gibi (boş kalabilir)
  socials: {
    github: "https://github.com/muweaf",
    linkedin: "https://www.linkedin.com/in/KULLANICI_ADIN/",
  },
  projects: [
    { title: "Kişisel Blog", desc: "Next.js + Tailwind", link: "https://github.com/KULLANICI/blog" },
    { title: "API Demo", desc: "Node/Express", link: "https://github.com/KULLANICI/api-demo" },
  ],
  gallery: [
    "/file.svg",
    "/globe.svg",
    "/next.svg",
  ],
} as const;
