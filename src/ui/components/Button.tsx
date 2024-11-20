import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, forwardRef } from "react";
import Loading from "~/components/Loading";
import { cn } from "~/utils";

const buttonVariants = cva("flex items-center justify-center", {
    variants: {
        variant: {
            primary: "border-stroke-primary hover:bg-secondary",
            danger: "border-danger hover:bg-danger",
        },

        borderSize: {
            none: "border-none",
            xm: "border",
        },

        size: {
            sm: "h-10 py-2 px-4",
            md: "p-4 py-3 rounded-md",
            action: "h-[35px] w-[50px]",
        },
    },

    defaultVariants: {
        borderSize: "xm",
        variant: "primary",
        size: "md",
    },
});

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, borderSize, isLoading, children, ...props },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size, borderSize, className })
                )}
                {...props}
            >
                {isLoading ? <Loading size="xm" /> : children}
            </button>
        );
    }
);

export default Button;
