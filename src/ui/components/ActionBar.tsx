import { ReactComponent as CloseIcon } from "~/assets/svg/close.svg";
import { ReactComponent as MinMaxIcon } from "~/assets/svg/minmax.svg";
import { ReactComponent as MinimiseIcon } from "~/assets/svg/minimise.svg";
import { ReactComponent as MoonIcon } from "~/assets/svg/moon.svg";
import { ReactComponent as SunIcon } from "~/assets/svg/sun.svg";

import Button from "~/components/Button";
import { useEffect, useState } from "react";
import { useSettingsContext } from "~/context/SettingsContext";

export default function ActionBar() {
    const { settings, updateSettings } = useSettingsContext();
    const [lightMode, setLightMode] = useState(0);

    useEffect(() => {
        if (!settings) return;
        setLightMode(settings.light_mode);
        document.documentElement.classList[
            settings.light_mode ? "add" : "remove"
        ]("light");
    }, [settings]);

    const actionButtons: {
        name: string;
        SVG: React.FC<React.SVGProps<SVGSVGElement>>;
        action: Function;
    }[] = [
        {
            name: "theme",
            SVG: lightMode ? SunIcon : MoonIcon,
            action: () => {
                updateSettings({ light_mode: settings.light_mode ? 0 : 1 });
            },
        },
        {
            name: "minimise",
            SVG: MinimiseIcon,
            action: window.api.window.minimize,
        },
        {
            name: "minmax",
            SVG: MinMaxIcon,
            action: window.api.window.toggleMinMax,
        },
        {
            name: "close",
            SVG: CloseIcon,
            action: window.api.window.close,
        },
    ];

    return (
        <div className="h-[36px] w-full bg-[var(--bg-action-bar)] flex items-center select-none border-[var(--stroke-primary)] border-b-[1px]">
            <p
                className="font-bold text-[16px] px-5 flex-1"
                style={{ WebkitAppRegion: "drag" } as any}
            >
                UA
            </p>
            <div className="flex">
                {actionButtons.map(({ name, SVG, action }) => (
                    <Button
                        key={name}
                        size="action"
                        borderSize="none"
                        className="cursor-default"
                        variant={name == "close" ? "danger" : "primary"}
                        onClick={() => action()}
                    >
                        <SVG width={15} />
                    </Button>
                ))}
            </div>
        </div>
    );
}
