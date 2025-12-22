import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-brand-coral text-white hover:bg-brand-coral-hover hover:-translate-y-0.5 shadow-coral-glow hover:shadow-lg",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-2 border-brand-maroon bg-transparent text-foreground hover:bg-brand-maroon hover:text-white",
      secondary: "bg-brand-maroon text-white hover:bg-brand-maroon-hover",
      ghost: "text-brand-sage hover:text-brand-sage-hover hover:underline underline-offset-4",
      link: "text-brand-coral underline-offset-4 hover:underline",
      nav: "bg-transparent text-muted-foreground hover:bg-bg-hover hover:text-foreground px-5 py-2 text-sm font-medium",
      navActive: "bg-brand-maroon text-white px-5 py-2 text-sm font-medium",
      hero: "bg-brand-coral text-white hover:bg-brand-coral-hover hover:-translate-y-1 shadow-coral-glow hover:shadow-lg text-base font-semibold",
      ctaLarge: "bg-brand-coral text-white hover:bg-brand-coral-hover hover:-translate-y-1 shadow-coral-glow hover:shadow-lg text-lg font-bold px-10 py-5"
    },
    size: {
      default: "h-10 px-6 py-2",
      sm: "h-9 rounded-md px-4",
      lg: "h-12 rounded-lg px-8 text-base",
      xl: "h-14 rounded-lg px-10 text-lg",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  size,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({
    variant,
    size,
    className
  }))} ref={ref} {...props} />;
});
Button.displayName = "Button";
export { Button, buttonVariants };