import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { cn } from "~/utils";
import Loading from "./loading";

const buttonVariants = cva("flex items-center justify-center", {
    variants: {
        variant: {
            primary:
                "bg-transparent border-[1px] border-[var(--stroke-primary)] hover:bg-[var(--bg-secondary)]",
        },

        onHover: {
            "safe-gray": "hover:bg-[var(--bg-secondary)]",
            danger: "hover:bg-red-500",
        },

        size: {
            sm: "h-10 py-2 px-4",
            md: "p-4 py-3 rounded-md",
            "action-sm": "h-[35px] w-[40px]",
        },
    },
});

interface ActionButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button: FC<ActionButtonProps> = forwardRef<
    HTMLButtonElement,
    ActionButtonProps
>(
    (
        { className, variant, size, onHover, isLoading, children, ...props },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size, className, onHover })
                )}
                {...props}
            >
                {isLoading ? <Loading className="w-[20px]" /> : children}
            </button>
        );
    }
);

export default Button;
