import { forwardRef, InputHTMLAttributes } from "react";
import { ReactComponent as MagnifierIcon } from "~/assets/svg/magnifier.svg";
import { cn } from "~/utils";

const SearchBar = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    return (
        <div className="relative">
            <MagnifierIcon className="absolute w-[18px] top-[50%] -translate-y-1/2 left-3" />
            <input
                {...props}
                ref={ref}
                className={cn(
                    "bg-transparent border-[1px] p-2 pl-10 rounded-xl border-[var(--bg-secondary)]",
                    className
                )}
            ></input>
        </div>
    );
});

export default SearchBar;
