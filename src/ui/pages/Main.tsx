import Button from "~/components/Button";
import { useModalContext } from "~/context/ModalContext";
import { useNotificationContext } from "~/context/NotificationContext";
import useRedirect from "~/hooks/useRedirect";

const Main = () => {
    const redirect = useRedirect();
    const { sendNotification } = useNotificationContext();
    const { createModal } = useModalContext();

    return (
        <div>
            Hello world{" "}
            <Button
                onClick={() => {
                    throw new Error("sometimes is happends");
                }}
            >
                throw error
            </Button>
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
            <Button
                onClick={async () => {
                    const modal = await createModal({
                        attributes: [
                            {
                                type: "title",
                                attributes: {
                                    children: "This is a test modal",
                                },
                            },
                            {
                                type: "input",
                                attributes: {
                                    id: "test",
                                },
                            },
                            {
                                type: "inline",
                                className: "gap-5",
                                attributes: [
                                    {
                                        type: "button",
                                        attributes: {
                                            type: "submit",
                                            children: "Yes",
                                            value: "yes",
                                            className: "flex-1",
                                            id: "yesButton", // Optional for debugging
                                        },
                                    },
                                    {
                                        type: "button",
                                        attributes: {
                                            type: "submit",
                                            children: "No",
                                            value: "no",
                                            variant: "danger",
                                            className: "flex-1",
                                            id: "noButton",
                                            autoFocus: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    }).catch(() => {
                        console.log("Modal aborted");
                    });
                    if (!modal) return;

                    console.log(
                        "Submitted button value:",
                        modal.modalSubmitter?.value
                    );
                    console.log("Input value:", modal.modalData.get("test"));
                }}
            >
                show modal
            </Button>
        </div>
    );
};

export default Main;
