import { cva, VariantProps } from "class-variance-authority";
import { FC, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "~/utils";

const checkboxVariants = cva("flex items-center cursor-pointer", {
    variants: {
        variant: {
            checkbox: "h-5 w-5 border rounded-sm",
            toggle: "relative inline-flex h-6 w-11 items-center rounded-full",
        },
        theme: {
            primary: "border-primary text-primary focus:ring-primary",
            danger: "border-danger text-danger focus:ring-danger",
        },
    },
    defaultVariants: {
        variant: "checkbox",
        theme: "primary",
    },
});

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "color">, // Exclude `color` from native attributes
        VariantProps<typeof checkboxVariants> {
    divClassName?: string;
    labelText?: string;
    labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            variant,
            divClassName,
            labelText,
            labelClassName,
            theme,
            ...props
        },
        ref
    ) => {
        const isToggle = variant === "toggle";

        return (
            <label
                className={cn(
                    "flex items-center gap-2",
                    isToggle && "cursor-pointer",
                    divClassName
                )}
            >
                <input
                    ref={ref}
                    type="checkbox"
                    className={cn(
                        checkboxVariants({ variant, theme }),
                        isToggle && "peer sr-only hidden",
                        className
                    )}
                    {...props}
                />
                {isToggle && (
                    <span
                        className={cn(
                            "w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-gray-500 transition-colors",
                            "after:content-[''] after:absolute after:h-5 after:w-5 after:rounded-full after:bg-white",
                            "peer-checked:after:translate-x-5 after:translate-x-0 after:transition-transform"
                        )}
                    />
                )}
                {labelText ? (
                    <p
                        className={cn(
                            "text-secondary ml-3 cursor-pointer ",
                            labelClassName
                        )}
                    >
                        {labelText}
                    </p>
                ) : (
                    ""
                )}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
