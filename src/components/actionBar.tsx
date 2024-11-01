import { ReactComponent as CloseIcon } from "~/assets/svg/actions/close.svg";
import { ReactComponent as MinMaxIcon } from "~/assets/svg/actions/minmax.svg";
import { ReactComponent as MinimiseIcon } from "~/assets/svg/actions/minimise.svg";

import Button from "./Button";
import { useEffect } from "react";

const actionButtons: {
    name: string;
    hoverType: "safe-gray" | "danger";
    SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    action: Function;
}[] = [
    {
        name: "minimise",
        hoverType: "safe-gray",
        SVG: MinimiseIcon,
        action: window.api.window.minimize,
    },
    {
        name: "minmax",
        hoverType: "safe-gray",
        SVG: MinMaxIcon,
        action: window.api.window.toggleMinMax,
    },
    {
        name: "close",
        hoverType: "danger",
        SVG: CloseIcon,
        action: window.api.window.close,
    },
];

export default function ActionBar() {
    useEffect(() => {
        console.log(window);
    });
    return (
        <div className="w-full bg-[var(--bg-action-bar)] flex items-center select-none border-[var(--stroke-primary)] border-b-[1px]">
            <p className="font-bold text-[16px] px-5 flex-1 window-dragable-element">
                UA
            </p>
            <div className="flex">
                {actionButtons.map(({ name, hoverType, SVG, action }) => (
                    <Button
                        key={name}
                        onHover={hoverType}
                        size="action-sm"
                        onClick={() => action()}
                    >
                        <SVG width={15} />
                    </Button>
                ))}
            </div>
        </div>
    );
}
