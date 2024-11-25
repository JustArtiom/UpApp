import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "~/utils";

const inputVariants = cva("placeholder-gray-600", {
    variants: {
        variant: {
            primary:
                "bg-transparent border-[1px] border-[var(--stroke-primary)]",
        },

        border: {
            error: "border-[var(--danger)]",
        },

        sizeType: {
            md: "px-4 py-3 rounded-xl",
        },
    },
    defaultVariants: {
        variant: "primary",
        sizeType: "md",
    },
});

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    id?: string;
    labelTitle?: string | React.ReactNode;
    divClassName?: string;
    optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            id,
            variant,
            divClassName,
            labelTitle,
            sizeType,
            optional,
            border,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn("flex flex-col", divClassName)}>
                {labelTitle ? (
                    <label
                        htmlFor={id}
                        className="text-lg font-medium ml-3 mb-2"
                    >
                        {labelTitle}{" "}
                        {optional ? (
                            <span className="text-secondary font-normal text-sm">
                                (optional)
                            </span>
                        ) : (
                            ""
                        )}
                    </label>
                ) : (
                    ""
                )}
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    {...props}
                    className={cn(
                        inputVariants({ className, variant, sizeType, border }),
                        "placeholder-text-secondary"
                    )}
                />
            </div>
        );
    }
);

export default Input;
