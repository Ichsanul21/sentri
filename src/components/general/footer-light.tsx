import { Heart, Globe, AtSign } from "lucide-react";
import NextLink from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export function FooterLight() {
  return (
    <footer className="bg-surface-canvas-light text-ink-deep">
      <div className="max-w-[1152px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-accent-lime font-bold text-xl tracking-tight">SENTRI</span>
            <p className="text-[14px] leading-[1.43] mt-2 text-on-dark-muted/50">
              Enterprise brand sentiment & social listening platform.
            </p>
            <div className="flex items-center gap-3 mt-4">
                <NextLink href="#" className="text-on-dark-muted hover:text-ink-deep transition-colors">
                  <AtSign size={18} />
                </NextLink>
                <NextLink href="#" className="text-on-dark-muted hover:text-ink-deep transition-colors">
                  <Globe size={18} />
                </NextLink>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[15px] font-medium uppercase tracking-[0.2px] mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <NextLink href={link.href} className="text-[14px] leading-[1.43] text-on-dark-muted/70 hover:text-ink-deep transition-colors">
                      {link.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline-cloud mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-[14px] leading-[1.43] text-on-dark-muted/50">&copy; 2026 Sentri. All rights reserved.</span>
          <span className="text-[14px] leading-[1.43] text-on-dark-muted/50">Made with <Heart size={14} className="inline text-accent-pink" /> for brand teams</span>
        </div>
      </div>
    </footer>
  );
}
