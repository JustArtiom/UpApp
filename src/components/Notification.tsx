import {
    MyNotification,
    useNotificationContext,
} from "~/context/NotificationContext";
import { ReactComponent as CopyToClipboardIcon } from "~/assets/svg/copy.svg";

const Notification = ({
    notification,
    newNotif,
}: {
    notification: MyNotification;
    newNotif?: boolean;
}) => {
    const { removeNotification, startTimeout, stopTimeout, sendNotification } =
        useNotificationContext();

    const handleCopy = (text: string, event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard
            .writeText(text)
            .then(() => {
                sendNotification(
                    "Successfully coppied to clipboard",
                    "success"
                );
            })
            .catch(() => {
                sendNotification("Error coppying to clipboard", "error");
            });
    };

    return (
        <div
            className={`relative bg-[var(--bg-primary)] rounded-xl border-[1px] p-3 w-[300px] m-5 hover:scale-[101%] transition-all duration-300 cursor-pointer pr-[40px] ${
                newNotif
                    ? "animate-notification-new"
                    : "animate-notification-old"
            }`}
            style={{
                borderColor:
                    notification.type == "success"
                        ? "green"
                        : notification.type == "warning"
                        ? "yellow"
                        : notification.type == "error"
                        ? "red"
                        : "gray",
            }}
            onClick={() => removeNotification(notification.id)}
            onMouseEnter={() => stopTimeout(notification.id)}
            onMouseLeave={() => startTimeout(notification.id, 1000)}
        >
            <CopyToClipboardIcon
                className="absolute w-[20px] top-0 right-0 m-3 z-30 cursor-pointer"
                onClick={(e) => handleCopy(notification.message, e)}
            />
            <p className="break-words">{notification.message}</p>
        </div>
    );
};

export default Notification;
