export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Bridal Studio",
  description: "Design unforgettable wedding looks with AI-powered tools.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Testimonials",
      href: "/#testimonials",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  authenticatedNavItems: [
    {
      label: "Studio",
      href: "/studio",
    },
    {
      label: "My Dresses",
      href: "/studio/my-dresses",
    },
    {
      label: "Profile",
      href: "/studio/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Design Studio",
      href: "/#demo",
    },

    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Testimonials",
      href: "/#testimonials",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Log In",
      href: "/auth/login",
    },
    {
      label: "Sign Up",
      href: "/auth/register",
    },
  ],
  authenticatedNavMenuItems: [
    {
      label: "Studio",
      href: "/studio",
    },
    {
      label: "My Dresses",
      href: "/studio/my-dresses",
    },
    {
      label: "Profile",
      href: "/studio/profile",
    },
    {
      label: "Ana Sayfa",
      href: "/",
    },
  ],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    instagram: "",
    tiktok: "https://discord.gg/9b6yyZKmH4",
  },
};
