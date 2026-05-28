"use client";

interface TableProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function THead({ children, className = "" }: TableProps) {
  return <thead className={className}>{children}</thead>;
}

export function TBody({ children, className = "" }: TableProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function THeadRow({ children, className = "" }: TableProps) {
  return (
    <tr className={`bg-white/[0.04] border-b border-hairline-violet ${className}`}>
      {children}
    </tr>
  );
}

export function TBodyRow({ children, className = "" }: TableProps) {
  return (
    <tr className={`border-b border-hairline-violet/50 h-12 hover:bg-accent-lime/4 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function Th({ children, className = "" }: TableProps) {
  return (
    <th className={`text-left text-[15px] font-medium uppercase tracking-[0.2px] text-on-dark-muted px-3 py-2 ${className}`}>
      {children}
    </th>
  );
}

export function Td({ children, className = "", colSpan }: TableProps) {
  return (
    <td colSpan={colSpan} className={`text-[16px] font-medium leading-[1.5] px-3 py-2 ${className}`}>
      {children}
    </td>
  );
}
