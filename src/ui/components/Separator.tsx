import { ButtonHTMLAttributes } from "react";
import { cn } from "~/utils";

const Separator = ({
    className,
    ...props
}: ButtonHTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn("w-full h-[1px] mx-auto bg-thirdary my-2", className)}
            {...props}
        ></div>
    );
};

export default Separator;
