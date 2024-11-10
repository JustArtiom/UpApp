import { formatDateTime } from "~/utils/date";
import { formatFileSize } from "~/utils/mem";
import { ReactComponent as EditIcon } from "~/assets/svg/edit.svg";
import { ReactComponent as DeleteIcon } from "~/assets/svg/delete.svg";
import Button from "./Button";

interface FileCardProps {
    variant?: "block" | "row";
    bgImage?: string;
    overlay?: {
        Icon: any;
        title?: string;
    };
    size?: number;
    name: string;
    date?: Date;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const width = 300;
const height = Math.round((width / 16) * 9);

const FileCard: React.FC<FileCardProps> = ({
    variant = "block",
    bgImage,
    overlay,
    size,
    name,
    date,
    onClick,
}) => {
    const { date: curdate, time, period } = formatDateTime(date || new Date());

    if (variant == "block")
        return (
            <div
                style={{ width }}
                className="cursor-pointer grayscale-[10%] hover:grayscale-0 mx-2"
                onClick={onClick}
            >
                <div
                    className={`w-full border-[1px] border-[var(--stroke-primary)] rounded-xl flex flex-col justify-center items-center text-gray-400 hover:text-white`}
                    style={{
                        height,
                        backgroundImage: bgImage
                            ? `url(${bgImage})`
                            : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {overlay ? (
                        <>
                            <overlay.Icon className="w-[40px]" />
                            <p>{overlay.title}</p>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex flex-col p-3">
                    <p>{name}</p>
                    {date ? (
                        <p className="text-gray-500 font-thin">
                            {curdate} | {time} {period}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    else
        return (
            <div
                onClick={onClick}
                className="w-full flex min-h-[40px] py-1 items-center px-5 hover:bg-[var(--bg-secondary)] cursor-pointer group"
            >
                <div
                    style={{
                        backgroundImage: bgImage
                            ? `url(${bgImage})`
                            : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {overlay ? (
                        <>
                            <overlay.Icon className="w-[20px] mr-3" />
                            <p>{overlay.title}</p>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <p className="flex-1 font-thin">{name}</p>
                {size ? (
                    <p className="text-gray-500 w-[100px] font-mono">
                        {formatFileSize(size)}
                    </p>
                ) : (
                    ""
                )}
                <p className="text-gray-500 font-thin w-[200px] font-mono">
                    {curdate} | {time} {period}
                </p>
                <div className="hidden group-hover:flex gap-2">
                    <Button
                        className="p-1  text-gray-500 hover:text-white"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <EditIcon className="w-[18px]" />
                    </Button>
                    <Button
                        className="p-1  text-gray-500 hover:text-red-500"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        <DeleteIcon className="w-[18px]" />
                    </Button>
                </div>
            </div>
        );
};

export default FileCard;
