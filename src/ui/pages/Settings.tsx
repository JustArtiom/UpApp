import Button from "~/components/Button";
import { useModalContext } from "~/context/ModalContext";
import { useNotificationContext } from "~/context/NotificationContext";
import useRedirect from "~/hooks/useRedirect";

const Settings = () => {
    const { sendNotification } = useNotificationContext();
    const { createModal } = useModalContext();
    const redirect = useRedirect();

    const CreateModalTest = async () => {
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
                                id: "yesButton",
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
        });

        if (!modal.modalSubmitter)
            return sendNotification("TEST: Modal has been aborted", "error");

        const data = modal.modalData.get("test");
        if (data) sendNotification("TEST: Modal Input recived: " + data);

        sendNotification(
            "TEST: Modal Button pressed: " + modal.modalSubmitter.value
        );
    };

    return (
        <div className="w-full h-full p-5 max-w-[500px] mx-auto">
            <div>
                <Button className="mb-10 " onClick={() => redirect("/")}>
                    {"<"} Go back
                </Button>
                <p className="text-2xl font-bold">Developer Mode</p>

                <div className="my-5">
                    <p className="text-xl font-semibold mb-2">Notifications</p>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() =>
                                sendNotification(
                                    "TEST: Success notification test"
                                )
                            }
                            variant="success"
                        >
                            Success
                        </Button>
                        <Button
                            onClick={() =>
                                sendNotification(
                                    "TEST: Warn notification test",
                                    "warn"
                                )
                            }
                            variant="warn"
                            className="border-warn"
                        >
                            Warn
                        </Button>
                        <Button
                            onClick={() =>
                                sendNotification(
                                    "TEST: Warn notification test",
                                    "error"
                                )
                            }
                            variant="danger"
                            className="border-danger"
                        >
                            Danger
                        </Button>
                    </div>
                </div>
                <div className="my-5">
                    <p className="text-xl font-semibold mb-2">Error handling</p>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => {
                                throw new Error("Example of a thrown error");
                            }}
                        >
                            Throw an error
                        </Button>
                    </div>
                </div>
                <div className="my-5">
                    <p className="text-xl font-semibold mb-2">Modal</p>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={CreateModalTest}>Create modal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
