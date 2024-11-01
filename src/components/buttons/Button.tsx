import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { cn } from "~/utils";

const buttonVariants = cva("flex items-center justify-center", {
    variants: {
        variant: {},

        onHover: {
            "safe-gray": "hover:bg-[var(--bg-secondary)]",
            danger: "hover:bg-red-500",
        },

        size: {
            sm: "h-10 py-2 px-4",
            md: "h-9 px-2 rounded-md",
            "action-sm": "h-[35px] w-[40px]",
        },
    },
});

interface ActionButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button: FC<ActionButtonProps> = forwardRef<
    HTMLButtonElement,
    ActionButtonProps
>(({ className, variant, size, onHover, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                buttonVariants({ variant, size, className, onHover })
            )}
            {...props}
        />
    );
});

export default Button;
