import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function Link({ href, children, dark = true, className = "" }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={`text-[16px] font-medium leading-[1.5] underline underline-offset-2 decoration-from-font ${
        dark ? "text-on-primary" : "text-ink-deep"
      } ${className}`}
    >
      {children}
    </NextLink>
  );
}
