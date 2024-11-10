import { ButtonHTMLAttributes } from "react";
import { ReactComponent as HouseIcon } from "~/assets/svg/home.svg";
import { ReactComponent as SelectedIcon } from "~/assets/svg/check.svg";
import { ReactComponent as AddIcon } from "~/assets/svg/add.svg";
import { ReactComponent as SettingsIcon } from "~/assets/svg/options.svg";
import { ReactComponent as QuestionIcon } from "~/assets/svg/question.svg";
import { ReactComponent as CoffeeIcon } from "~/assets/svg/coffee.svg";
import { useServerContext } from "~/context/ServersContext";
import { cn } from "~/utils";
import { useNavigate, useParams } from "react-router-dom";

const NavButton = ({
    Icon,
    title,
    className,
    active = false,
    ...props
}: {
    Icon?: typeof HouseIcon;
    title: string;
    active?: boolean;
} & ButtonHTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "flex items-center rounded-md my-1 mx-2 p-2 px-4 hover:bg-[var(--bg-secondary-hover)] text-white cursor-pointer",
                className
            )}
            style={{
                backgroundColor: active
                    ? "var(--bg-secondary-hover)"
                    : undefined,
            }}
            {...props}
        >
            {Icon ? (
                <Icon className="w-[25px]" />
            ) : (
                <div className="w-[25px] h-[25px]"></div>
            )}
            <p className="ml-5 text-base">{title}</p>
        </div>
    );
};

const Divisor = ({
    className,
    ...props
}: ButtonHTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "w-[80%] h-[1px] mx-auto bg-[var(--bg-secondary-hover)] my-2",
                className
            )}
            {...props}
        ></div>
    );
};

const Navigation = () => {
    const { server_id } = useParams();
    const { servers } = useServerContext();
    const navigate = useNavigate();

    return (
        <div className="bg-[var(--bg-secondary)] max-w-[320px] w-[30%] rounded-2xl flex flex-col p-2 py-3">
            <NavButton Icon={HouseIcon} title="Home" active={true} />
            <Divisor />
            {servers.map((x) => (
                <NavButton
                    key={x.id}
                    title={x.alias_domain || x.id}
                    Icon={x.id === server_id ? SelectedIcon : undefined}
                    active={x.id === server_id}
                    onClick={() => {
                        navigate(`/${encodeURI(x.id)}`);
                    }}
                />
            ))}
            <NavButton
                Icon={AddIcon}
                title="Add server"
                className="text-gray-500 hover:text-white"
                onClick={() => {
                    navigate("/add-server");
                }}
            />
            <div className="flex-1"></div>
            <Divisor />
            <NavButton
                Icon={SettingsIcon}
                title="Settings"
                className="text-gray-500 hover:text-white"
            />
            <NavButton
                Icon={QuestionIcon}
                title="Support"
                className="text-gray-500 hover:text-white"
            />
            <NavButton
                Icon={CoffeeIcon}
                title="Get me a coffee"
                className="text-gray-500 hover:text-white"
            />
        </div>
    );
};

export default Navigation;
