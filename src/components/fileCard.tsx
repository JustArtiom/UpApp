import { formatDateTime } from "~/utils/date";

interface FileCardProps {
    variant?: "block" | "row";
    bgImage?: string;
    overlay?: {
        Icon: any;
        title?: string;
    };
    name: string;
    date: Date;
}

const width = 300;
const height = Math.round((width / 16) * 9);

const FileCard: React.FC<FileCardProps> = ({
    variant = "block",
    bgImage,
    overlay,
    name,
    date,
}) => {
    const { date: curdate, time, period } = formatDateTime(date);

    if (variant == "block")
        return (
            <div
                style={{ width }}
                className="cursor-pointer grayscale-[10%] hover:grayscale-0"
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
                    <p className="text-gray-500 font-thin">
                        {curdate} | {time} {period}
                    </p>
                </div>
            </div>
        );
};

export default FileCard;
