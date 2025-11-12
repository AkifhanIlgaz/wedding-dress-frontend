export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Anasayfa",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },

    {
      label: "İletişim",
      href: "/contact",
    },
  ],
  authenticatedNavItems: [
    {
      label: "Gelinliğini Tasarla",
      href: "/design",
    },
    {
      label: "Dene",
      href: "/try-on",
    },
    {
      label: "Gelinliklerim",
      href: "/my-wedding-dresses",
    },
    {
      label: "Profil",
      href: "/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Anasayfa",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },

    {
      label: "İletişim",
      href: "/contact",
    },
    {
      label: "Giriş Yap",
      href: "/login",
    },
    {
      label: "Üye Ol",
      href: "/register",
    },
  ],
  authenticatedNavMenuItems: [
    {
      label: "Profil",
      href: "/profile",
    },
    {
      label: "Gelinliğini Tasarla",
      href: "/design",
    },
    {
      label: "Dene",
      href: "/try-on",
    },
    {
      label: "Gelinliklerim",
      href: "/my-wedding-dresses",
    },
  ],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    instagram: "",
    tiktok: "https://discord.gg/9b6yyZKmH4",
  },
};
