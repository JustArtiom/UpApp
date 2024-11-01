import { cva, VariantProps } from "class-variance-authority";
import {
    ButtonHTMLAttributes,
    FC,
    forwardRef,
    InputHTMLAttributes,
} from "react";
import { cn } from "~/utils";

const inputVariants = cva("placeholder-gray-600", {
    variants: {
        variant: {
            transparent: "bg-transparent",
        },

        border: {
            primary: "border-[1px] border-[var(--stroke-primary)]",
        },

        sizeType: {
            md: "px-4 py-3 rounded-xl",
        },
    },
    defaultVariants: {
        sizeType: "md",
    },
});

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    id: string;
    labelTitle?: string | React.ReactNode;
    divClassName?: string;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            id,
            variant,
            divClassName,
            labelTitle,
            sizeType,
            border,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn("flex flex-col", divClassName)}>
                {labelTitle ? <label htmlFor={id}>{labelTitle}</label> : ""}
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    {...props}
                    className={cn(
                        inputVariants({ className, variant, sizeType, border })
                    )}
                />
            </div>
        );
    }
);

export default Input;
