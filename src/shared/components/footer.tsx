import { siteConfig } from "@/src/config/site";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { DiscordIcon, GithubIcon, Logo, TwitterIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-6 border-t-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-bold text-lg">ACME</span>
            </div>
            <p className="text-sm opacity-80">Design your own wedding dress</p>
          </div>

          <FooterSection title="Quick Links" links={siteConfig.navItems} />

          {/*<FooterSection title="Yasal" links={siteConfig.legalDocuments} />*/}

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href={"mailto:info@bridal.org"}
                  className="footer-nav-link"
                >
                  info@bridal.org
                </Link>
              </li>

              <li>
                <div className="flex   gap-2">
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
                  <Link
                    isExternal
                    aria-label="Github"
                    href={siteConfig.links.github}
                  >
                    <GithubIcon className="text-accent-500" />
                  </Link>
                </div>
              </li>
              {/*{links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}*/}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm opacity-80 mb-3">
              Subscribe for the latest news and updates.
            </p>
            <Input type="email" placeholder="Your email address" />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center ">
          <span className="text-default-600">
            © 2025 <span className="text-primary">Bridal AI</span>{" "}
          </span>
          <span className="text-default-600">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  links: NavLink[];
}

type NavLink = {
  href: string;
  label: string;
};

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm opacity-80">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer-nav-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
