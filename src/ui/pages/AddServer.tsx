import { useEffect, useState } from "react";
import Form from "~/components/Form";
import useRedirect from "~/hooks/useRedirect";
import { S3 } from "~/utils/s3";

const Main = () => {
    const redirect = useRedirect();
    const [animate, runAnimation] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [fieldErrors, setFieldsErrors] = useState({
        ip: false,
        port: false,
        alias: false,
        user: false,
        password: false,
    });

    useEffect(() => {
        console.log("Add server page");

        const appbody = document.getElementById("app-body");
        appbody.style.overflowY = "hidden";
        console.log("Removed overflow Y on App-body");

        setTimeout(() => {
            console.log("Running animation");
            runAnimation(true);
            setOpacity(1);
        }, 500);
        setTimeout(() => {
            console.log("Added overflow Y on App-body");
            appbody.style.overflowY = "auto";
        }, 1000);
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        console.log("Add Server Form submited");
        const formData = new FormData(e.currentTarget);

        const ip = formData.get("server_ip") as string;
        const port = formData.get("server_port") as string;
        const alias = formData.get("server_alias") as string;
        const usrn = formData.get("server_username") as string;
        const passwd = formData.get("server_password") as string;
        const ssl = !!formData.get("server_ssl");

        try {
            const s3 = new S3(ip, Number(port), usrn, passwd, ssl, alias);

            console.log("Initializing the client");
            await s3.createClient();

            console.log("Pinging the server");
            await s3.ping();
            console.log("Server responded successfully");

            await s3.saveInDatabase();
        } catch (err) {
            console.error("Error while loading the server.", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="max-w-[450px] p-5 py-10 flex flex-col justify-center mx-auto transition-transform duration-500 min-h-full"
            style={{
                transform: animate ? "translateY(0)" : "translateY(28vh)",
            }}
        >
            <p className="mb-2 text-2xl text-center font-bold">
                Welcome to UpApp
            </p>
            <p className="text-secondary text-center mb-5">
                Lets get on with some configuration
            </p>
            <Form
                onSubmit={handleFormSubmit}
                className="transition-opacity duration-500"
                style={{ opacity }}
                attributes={[
                    {
                        type: "inline",
                        className: "gap-3",
                        attributes: [
                            {
                                type: "input",
                                attributes: {
                                    id: "server_ip",
                                    labelTitle: "Server Ip",
                                    placeholder: "127.0.0.1",
                                    type: "text",
                                    divClassName: "flex-1 min-w-[250px]",
                                    border: fieldErrors.ip
                                        ? "error"
                                        : undefined,
                                    required: true,
                                },
                            },
                            {
                                type: "input",
                                attributes: {
                                    id: "server_port",
                                    labelTitle: "Port",
                                    placeholder: "6969",
                                    type: "number",
                                    divClassName: "md:w-[120px] w-full ",
                                    border: fieldErrors.port
                                        ? "error"
                                        : undefined,
                                    required: true,
                                },
                            },
                        ],
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "server_alias",
                            labelTitle: "Proxy / Alias",
                            placeholder: "https://example.com",
                            type: "text",
                            border: fieldErrors.alias ? "error" : undefined,
                            optional: true,
                        },
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "server_username",
                            labelTitle: "Username",
                            placeholder: "JohnCena",
                            type: "text",
                            border: fieldErrors.user ? "error" : undefined,
                            required: true,
                        },
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "server_password",
                            labelTitle: "Password",
                            placeholder: "shhh...",
                            border: fieldErrors.password ? "error" : undefined,
                            type: "password",
                        },
                    },
                    {
                        type: "checkbox",
                        attributes: {
                            id: "server_ssl",
                            name: "server_ssl",
                            variant: "checkbox",
                            className: "w-[16px]",
                            labelText:
                                "Use Secure Socket Layer (SSL) to connect",
                        },
                    },
                    {
                        type: "checkbox",
                        attributes: {
                            variant: "checkbox",
                            className: "w-[16px]",
                            labelText:
                                "I aggree to the terms of service and privacy policy",
                            required: true,
                        },
                    },
                    {
                        type: "button",
                        attributes: {
                            isLoading: isLoading,
                            disabled: isLoading,
                            type: "submit",
                            children: "Connect",
                            className: "w-[120px] h-[50px] mx-auto my-2",
                        },
                    },
                ]}
            />
        </div>
    );
};

export default Main;
