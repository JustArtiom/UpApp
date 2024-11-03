import { cva, VariantProps } from "class-variance-authority";
import {
    ButtonHTMLAttributes,
    FC,
    forwardRef,
    InputHTMLAttributes,
} from "react";
import { cn } from "~/utils";

const checkboxVariants = cva("placeholder-gray-600", {
    variants: {},
});

interface CheckboxProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof checkboxVariants> {
    id: string;
    labelTitle?: string | React.ReactNode;
    divClassName?: string;
    lablelClassName?: string;
}

const CheckBox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        { className, id, divClassName, lablelClassName, labelTitle, ...props },
        ref
    ) => {
        return (
            <div className={cn("flex flex-row pt-5", divClassName)}>
                <input
                    ref={ref}
                    id={id}
                    name={id}
                    type="checkbox"
                    {...props}
                    className={cn(
                        checkboxVariants({
                            className,
                        }),
                        "mr-2 "
                    )}
                />
                {labelTitle ? (
                    <label htmlFor={id} className={lablelClassName}>
                        {labelTitle}
                    </label>
                ) : (
                    ""
                )}
            </div>
        );
    }
);

export default CheckBox;
