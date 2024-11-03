import { useEffect, useMemo, useState } from "react";
import AddServerForm from "~/components/web/AddServer";
import { useErrorContext } from "~/context/errorContext";
import { Storage } from "~/utils/services/s3";

export default function Welcome() {
    const [opacity, setOpacity] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const transitionTime = useMemo(() => 1000, []);
    const { addError } = useErrorContext();

    useEffect(() => {
        const appbody = document.getElementById("appbody");
        setTimeout(() => {
            appbody.style.overflowY = "hidden";
            setOpacity(100);
        }, 0); // why...
        setTimeout(() => {
            setAnimate(true);
        }, 1000);
        setTimeout(() => {
            appbody.style.overflowY = "auto";
        }, 2000);
    }, []);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("yourName") as string | undefined;
        const ip = formData.get("serverIp") as string;
        const port = formData.get("serverPort") as string;
        const uname = formData.get("username") as string;
        const password = formData.get("password") as string;
        const ssl = formData.get("ssl") as null | "on";

        const sclient = new Storage(ip, Number(port), uname, password, !!ssl);
        await sclient.createClient();
        await sclient
            .ping()
            .then(() => {
                alert("it worked blud");
            })
            .catch((err) => {
                addError(err.toString());
                setIsLoading(false);
            });
    }

    return (
        <div className="transition-all w-full min-h-full flex flex-col items-center justify-center py-10">
            <div
                className="flex flex-col items-center w-full"
                style={{
                    opacity: opacity,
                    transitionDuration: transitionTime + "ms",
                    transform: animate
                        ? "translateY(0)"
                        : "translateY(calc(25vh))",
                }}
            >
                <p className="mb-1 font-bold text-2xl">Welcome to UpApp</p>
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
                        askFirstName={true}
                        isLoading={isLoading}
                        onSubmit={submitForm}
                    />
                </div>
            </div>
        </div>
    );
}
