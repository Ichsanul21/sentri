interface SkeletonProps {
  variant?: "text" | "card" | "chart" | "avatar";
  className?: string;
}

const variants: Record<string, string> = {
  text: "h-3.5 w-full",
  card: "h-32 w-full",
  chart: "h-48 w-full",
  avatar: "h-9 w-9 rounded-full",
};

export function Skeleton({ variant = "text", className = "" }: SkeletonProps) {
  return <div className={`skeleton ${variants[variant]} ${className}`} />;
}
