export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Design unforgettable wedding looks with AI-powered tools.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },

    {
      label: "Contact",
      href: "/contact",
    },
  ],
  authenticatedNavItems: [
    {
      label: "Design Your Dress",
      href: "/design",
    },
    {
      label: "Try On",
      href: "/try-on",
    },
    {
      label: "My Dresses",
      href: "/my-wedding-dresses",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },

    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Log In",
      href: "/login",
    },
    {
      label: "Sign Up",
      href: "/register",
    },
  ],
  authenticatedNavMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Design Your Dress",
      href: "/design",
    },
    {
      label: "Try On",
      href: "/try-on",
    },
    {
      label: "My Dresses",
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
