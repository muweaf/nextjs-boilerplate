export const site = {
  fullName: "Murat Musa Dimlit",
  studentNo: "2311012705",
  email: "muratdimlit80@gmail.com",
  videoId: "ZxG_1-OuiVk",
  profileImage: "",     // public/ altındaki görsel ya da tam URL (boş bırakılabilir)
  cvUrl: "",            // public/MuratMusaDimlit-CV.pdf gibi (boş bırakılabilir)
  socials: {
    github: "https://github.com/muweaf",
    linkedin: "https://www.linkedin.com/in/KENDI-LINKEDIN-ADRESIN/",
  },
  projects: [
    { title: "Kişisel Blog", desc: "Next.js + Tailwind", link: "https://github.com/muweaf/REPO-ADI" },
    { title: "API Demo", desc: "Node/Express", link: "https://github.com/muweaf/REPO-ADI" },
  ],
  gallery: ["/file.svg","/globe.svg","/next.svg"],
} as const;
