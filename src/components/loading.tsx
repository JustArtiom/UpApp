import { cva, VariantProps } from "class-variance-authority";
import { FC, forwardRef, HTMLAttributes } from "react";
import { cn } from "~/utils";
import { ReactComponent as LoadingCircleIcon } from "~/assets/svg/loading_circle.svg";

const loadingVariants = cva("", {
    variants: {
        size: {
            sm: "h-10 w-10",
            md: "h-20 w-20",
        },
    },
});

interface LoadingProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof loadingVariants> {}

const Loading: FC<LoadingProps> = forwardRef<HTMLDivElement, LoadingProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(loadingVariants({ size, className }))}
                {...props}
            >
                <LoadingCircleIcon className="animate-spin" />
            </div>
        );
    }
);

export default Loading;
