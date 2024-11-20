import { ReactComponent as LoadingCircleIcon } from "~/assets/svg/loading-circle.svg";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "~/utils";

const loadingVariants = cva("text-text-primary", {
    variants: {
        size: {
            xm: "h-7 w-7",
            sm: "h-10 w-10",
            md: "h-20 w-20",
            lg: "h-30 w-30",
        },
    },

    defaultVariants: {
        size: "md",
    },
});

interface LoadingProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof loadingVariants> {}

const Loading = forwardRef<SVGSVGElement, LoadingProps>(
    ({ className, size }, ref) => {
        return (
            <LoadingCircleIcon
                ref={ref}
                className={cn(
                    "animate-spin",
                    loadingVariants({ size, className })
                )}
            />
        );
    }
);

export default Loading;
