import { FC, useEffect, useRef, useState } from "react";
import { Notification } from "~/utils/types";
import { ReactComponent as CloseIcon } from "~/assets/svg/close.svg";
import { ReactComponent as PapersIcon } from "~/assets/svg/papers.svg";
import { ReactComponent as CheckIcon } from "~/assets/svg/check.svg";
import { useNotificationContext } from "~/context/NotificationContext";
import useClipboard from "~/hooks/useClipboard";

const Notification: FC<{
    id: number;
    data: Notification["data"];
    type: Notification["type"];
    isNew: boolean;
}> = ({ id, data, type, isNew }) => {
    const {
        removeNotification,
        pauseNotification,
        resumeNotification,
        timeouts,
    } = useNotificationContext();
    const { notifications } = useNotificationContext();
    const { copyToClipbaord } = useClipboard();

    const divRef = useRef<HTMLDivElement>();
    const notifCache = useRef(0);
    const [coppied, setCoppied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [progress, setProgress] = useState(100);
    const timer = useRef<NodeJS.Timeout>(undefined);

    const handleMouseEnter = () => {
        setHovered(true);
        pauseNotification(id);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        resumeNotification(id);
    };

    useEffect(() => {
        let cpytimeout: NodeJS.Timeout;
        if (coppied)
            cpytimeout = setTimeout(() => {
                setCoppied(false);
            }, 1000);

        return () => {
            clearTimeout(cpytimeout);
        };
    }, [coppied]);

    useEffect(() => {
        const timeout = timeouts.get(id);

        if (timeout?.timeout) {
            console.log("Resumed Notification:", id);
            timer.current = setInterval(() => {
                const elapsedTime =
                    Date.now() -
                    timeout.start +
                    (timeout.totalTime - timeout.remainingTime);
                const newProgress =
                    100 - (elapsedTime * 100) / timeout.totalTime;

                setProgress(newProgress);

                if (newProgress < 0) clearInterval(timer.current);
            }, 50);
        } else {
            console.log("Paused Notification", id);
            clearInterval(timer.current);
        }
    }, [timeouts, hovered]);

    useEffect(() => {
        if (!divRef.current) {
            console.error(
                "Error getting the ref of the notification div on render"
            );
            return;
        }

        divRef.current.onanimationend = () => {
            divRef.current.style.animation = "";
        };

        return () => {
            if (divRef.current) {
                divRef.current.onanimationend = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!divRef || isNew) return;

        if (notifCache.current < notifications.length)
            divRef.current.style.animation = "notif-move-up .3s ease forwards";
        notifCache.current = notifications.length;
    }, [notifications]);

    const color =
        type == "success"
            ? "var(--success)"
            : type == "warn"
            ? "var(--warn)"
            : type == "error"
            ? "var(--danger)"
            : "blue";

    return (
        <div
            ref={divRef}
            className={`relative m-5 p-2 w-[300px] border-[1px] rounded-md border-solid bg-primary`}
            style={{
                borderColor: color,
                animation: isNew ? "fade-from-right .3s ease forwards" : "",
            }}
            onClick={() => removeNotification(id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute top-0 left-0 h-[2px] rounded-t-md"
                style={{
                    width: `${progress}%`,
                    backgroundColor: color,
                    transition: "width 0.05s linear",
                }}
            />
            <div className="flex items-center">
                <p style={{ color }} className="font-bold flex-1">
                    {type.replace(/^./, type[0].toUpperCase())}
                </p>
                {coppied ? (
                    <CheckIcon height={18} className="mr-4" />
                ) : (
                    <PapersIcon
                        height={18}
                        className="mr-4 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            copyToClipbaord(data).then((r) => setCoppied(r));
                        }}
                    />
                )}
                <CloseIcon height={18} className="mr-1 cursor-pointer" />
            </div>
            <p>{data}</p>
        </div>
    );
};

export default Notification;
