import { ReactComponent as HomeIcon } from "~/assets/svg/home.svg";
import { ReactComponent as CheckIcon } from "~/assets/svg/check.svg";
import { ReactComponent as SettingsIcon } from "~/assets/svg/settings.svg";
import { ReactComponent as HeartIcon } from "~/assets/svg/heart.svg";
import { ReactComponent as PlusIcon } from "~/assets/svg/plus.svg";
import useRedirect from "~/hooks/useRedirect";
import { cn } from "~/utils";
import { ButtonHTMLAttributes } from "react";
import Separator from "./Separator";
import { useServerContext } from "~/context/ServersContext";
import { useParams } from "react-router-dom";

const NavButton = ({
    Icon,
    title,
    className,
    active = false,
    ...props
}: {
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    active?: boolean;
} & ButtonHTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "flex items-center rounded-md my-1.5 p-2 px-4 hover:bg-thirdary text-primary cursor-pointer",
                !active && "text-secondary hover:text-primary",
                className
            )}
            style={{
                backgroundColor: active ? "var(--thirdary)" : undefined,
            }}
            {...props}
        >
            {Icon ? (
                <Icon className="w-[23px]" />
            ) : (
                <div className="w-[23px] h-[23px]"></div>
            )}
            <p className={"ml-5 text-base "}>{title}</p>
        </div>
    );
};

const Navigator = () => {
    const app_redirect = useRedirect();
    const server_redirect = useRedirect(`server-body`);

    const { server_id } = useParams();
    const { servers } = useServerContext();

    return (
        <div className="w-[30%] min-w-[250px] max-w-[300px] bg-secondary rounded-lg px-5 py-3 flex flex-col">
            <NavButton Icon={HomeIcon} title="Home" active={true} />
            <Separator />
            <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hidden">
                {servers.map((x) => (
                    <NavButton
                        key={x.id}
                        title={x.alias_domain || x.id}
                        Icon={x.id === server_id ? CheckIcon : undefined}
                        active={x.id === server_id}
                        onClick={() => {
                            server_redirect(`/app/${x.id}`, false);
                        }}
                    />
                ))}
                <NavButton
                    Icon={PlusIcon}
                    title="Add Server"
                    className="hover:bg-secondary"
                    onClick={() => app_redirect("/add-server")}
                />
            </div>
            <Separator />
            <NavButton
                Icon={SettingsIcon}
                title="Settings"
                onClick={() => app_redirect("/settings")}
            />
            <NavButton Icon={HeartIcon} title="Donate" />
        </div>
    );
};

export default Navigator;
