import Notification from "~/components/Notification";
import { useNotificationContext } from "~/context/NotificationContext";
import { Notification as NotifType } from "~/utils/types";

const NotificationLayout = () => {
    const { notifications } = useNotificationContext();
    return (
        <div className="fixed bottom-0 right-0 z-10">
            {notifications.map((notif: NotifType, i: number) => {
                return (
                    <Notification
                        key={notif.id}
                        id={notif.id}
                        data={notif.data}
                        type={notif.type}
                        isNew={i + 1 - notifications.length == 0}
                    />
                );
            })}
        </div>
    );
};

export default NotificationLayout;
