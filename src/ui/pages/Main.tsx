import Button from "~/components/Button";
import { useNotificationContext } from "~/context/NotificationContext";
import useRedirect from "~/hooks/useRedirect";

const Main = () => {
    const redirect = useRedirect();
    const { sendNotification } = useNotificationContext();

    return (
        <div>
            Hello world <Button onClick={() => {}}>throw error</Button>
            <Button onClick={() => redirect("/add-server")}>add server</Button>
            <Button onClick={() => sendNotification("Notification test")}>
                send success
            </Button>
            <Button
                onClick={() => sendNotification("Notification test", "warn")}
            >
                send warn
            </Button>
            <Button
                onClick={() => sendNotification("Notification test", "error")}
            >
                send error
            </Button>
        </div>
    );
};

export default Main;
