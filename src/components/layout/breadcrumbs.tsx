import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-[14px] leading-[1.43] mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-on-dark-muted/50">/</span>}
          {item.href ? (
            <Link href={item.href} className="text-on-dark-muted hover:text-accent-lime transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-on-primary font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
