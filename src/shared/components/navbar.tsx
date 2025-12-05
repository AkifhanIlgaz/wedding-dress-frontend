import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { button, link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { siteConfig } from "@/src/config/site";
import { authRoutes } from "@/src/features/auth/auth.routes";
import {
  DiscordIcon,
  GithubIcon,
  TwitterIcon,
} from "@/src/shared/components/icons";
import { ThemeSwitch } from "@/src/shared/components/theme-switch";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      shouldBlockScroll
      shouldHideOnScroll
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-4">
          <NextLink className="flex justify-start items-center gap-3" href="/">
            <div className="w-20 h-20 shrink-0">
              <img
                src="/logo-removebg-preview.png"
                alt="Bridal AI Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-bold text-xl text-inherit">Bridal</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  `nav-link`,
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            href={authRoutes.login}
            className={button({
              color: "primary",
              variant: "ghost",
            })}
          >
            Log In
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className={button({
              color: "primary",
              variant: "shadow",
            })}
          >
            Design Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.authenticatedNavMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === siteConfig.authenticatedNavMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className=" sm:flex gap-4 w-full ">
            <Link
              isExternal
              aria-label="Twitter"
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="text-accent-500" />
            </Link>
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.tiktok}
            >
              <DiscordIcon className="text-accent-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-accent-500" />
            </Link>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
