import * as React from "react";
import { cn } from "@/lib/utils";

type Variants = "default" | "outline" | "ghost";
type Sizes = "sm" | "md" | "lg" | "icon";

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: Variants;
  size?: Sizes;
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold rounded-full transition " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";
  const v =
    variant === "default"
      ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:opacity-95 px-4 py-2"
      : variant === "outline"
      ? "border border-black/10 bg-white/50 hover:bg-white px-4 py-2"
      : "hover:bg-black/5 px-3 py-2";
  const s =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-base px-5 py-3"
      : size === "icon"
      ? "p-2 rounded-full"
      : "text-sm";

  const cls = cn(base, v, s, className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(cls, child.props?.className),
      ...(props.onClick ? { onClick: props.onClick } : {}),
      ...(props.title ? { title: props.title } : {}),
      ...(props["aria-label"] ? { "aria-label": props["aria-label"] } : {}),
    });
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
