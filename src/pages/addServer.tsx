import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddServerForm from "~/layouts/AddServer";
import { useNotificationContext } from "~/context/NotificationContext";
import { useServerContext } from "~/context/ServersContext";
import { useUserContext } from "~/context/UserContext";
import { Storage } from "~/utils/services/s3";

export default function AddServer() {
    const navigate = useNavigate();
    const { username, setUsername } = useUserContext();
    const { addServer } = useServerContext();
    const [opacity, setOpacity] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const transitionTime = useMemo(() => 500, []);
    const { sendNotification } = useNotificationContext();

    useEffect(() => {
        const appbody = document.getElementById("appbody");
        setTimeout(() => {
            appbody.style.overflowY = "hidden";
            setOpacity(100);
        }, 1); // why...
    }, []);

    useEffect(() => {
        const appbody = document.getElementById("appbody");
        if (username === undefined) return;
        setTimeout(() => {
            setAnimate(true);
        }, 1000);
        setTimeout(() => {
            appbody.style.overflowY = "auto";
        }, 2000);
    }, [username]);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        let name = formData.get("yourName") as string | undefined;
        const ip = formData.get("serverIp")?.toString().toLowerCase() as string;
        const port = formData.get("serverPort") as string;
        const uname = formData.get("username") as string;
        const password = formData.get("password") as string;
        const ssl = formData.get("ssl") as null | "on";

        try {
            const sclient = new Storage(
                ip,
                Number(port),
                uname,
                password,
                !!ssl
            );
            await sclient.createClient();
            await sclient.ping();

            if (!username && name) {
                name = name.replace(/^./, name[0].toUpperCase());
                window.api.db.saveUser(name);
            }

            await sclient.saveInDatabase();

            addServer(sclient);

            // Just so it looks cool
            await new Promise((res) => setTimeout(res, 1000));

            if (!username && name) setUsername(name);
            setIsLoading(false);
            setOpacity(0);
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err) {
            console.error(err);
            sendNotification(err.toString(), "error");
            setIsLoading(false);
        }
    }

    if (username === undefined) return <></>;

    return (
        <div className="transition-all w-full min-h-full flex flex-col items-center justify-center py-10">
            <div
                className="flex flex-col items-center w-full"
                style={{
                    opacity: opacity,
                    transitionDuration: transitionTime + "ms",
                    transform: animate
                        ? "translateY(0)"
                        : "translateY(calc(40%))",
                }}
            >
                <p className="mb-1 font-bold text-2xl">
                    Welcome {username ? username : "to UpApp"}
                </p>
                <p className="text-gray-600">
                    Lets get on with some configuration
                </p>

                <div
                    className="w-[50%] max-w-[380px] mt-2 transition-opacity"
                    style={{
                        opacity: animate ? 100 : 0,
                        transitionDuration: "1s",
                    }}
                >
                    <AddServerForm
                        askFirstName={!username}
                        isLoading={isLoading}
                        onSubmit={submitForm}
                    />
                    {
                        <button
                            className="w-full text-center mx-auto my-5 underline text-gray-500 cursor-pointer"
                            onClick={() => {
                                setOpacity(0);
                                setTimeout(() => {
                                    navigate("/");
                                }, 1000);
                            }}
                        >
                            Back home
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
