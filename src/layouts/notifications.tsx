import { useNotificationContext } from "~/context/NotificationContext";
import Notification from "~/components/Notification";

const NotificationLayout = () => {
    const { notifications } = useNotificationContext();

    return (
        <div className="absolute bottom-0 right-0 z-20 overflow-hidden">
            {notifications.map((notif, i) => (
                <Notification
                    key={notif.id}
                    notification={notif}
                    newNotif={i + 1 - notifications.length == 0}
                />
            ))}
        </div>
    );
};

export default NotificationLayout;
