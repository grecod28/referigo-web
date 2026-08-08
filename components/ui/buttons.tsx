"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-ring",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface focus-visible:ring-ring",
  ghost:
    "bg-transparent text-foreground hover:bg-surface focus-visible:ring-ring",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive",
};

const sizes = {
  sm: "h-8 px-3 text-sm rounded-badge",
  md: "h-10 px-5 text-sm rounded-ticket",
  lg: "h-12 px-6 text-base rounded-ticket",
};

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
