import { useNotificationContext } from "~/context/NotificationContext";

const useClipboard = () => {
    const { sendNotification } = useNotificationContext();

    const copyToClipbaord = (text: string) =>
        new Promise<boolean>((res) => {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    console.log("Coppied to clipboard");
                    res(true);
                })
                .catch(() => {
                    console.log("Error copying to clipboard");
                    sendNotification("Error coppying to clipboard", "error");
                    res(false);
                });
        });

    return { copyToClipbaord };
};

export default useClipboard;
