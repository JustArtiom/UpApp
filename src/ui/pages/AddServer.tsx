import { useEffect, useState } from "react";
import Form from "~/components/Form";
import useRedirect from "~/hooks/useRedirect";

const Main = () => {
    const redirect = useRedirect();
    const [animate, runAnimation] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

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

    return (
        <div
            className="max-w-[450px] p-5 mx-auto transition-transform duration-500 flex justify-center items-center flex-col h-full"
            style={{
                transform: animate ? "translateY(0)" : "translateY(240px)",
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
                        attributes: [
                            {
                                type: "input",
                                attributes: {
                                    id: "server_ip",
                                    labelTitle: "Server Ip",
                                    placeholder: "127.0.0.1",
                                    type: "text",
                                    divClassName: "flex-1 min-w-[250px]",
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
                                    divClassName: "md:ml-3 md:w-[120px] w-full",
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
                            placeholder: "https://i.artiom.me",
                            type: "text",
                            optional: true,
                        },
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "server_username",
                            labelTitle: "Username",
                            placeholder: "Artiomka",
                            type: "text",
                            required: true,
                        },
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "server_password",
                            labelTitle: "Password",
                            placeholder: "shhh...",
                            type: "password",
                        },
                    },
                    {
                        type: "checkbox",
                        attributes: {
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
                            type: "submit",
                            children: "Connect",
                            className: "w-[120px] mx-auto my-2",
                        },
                    },
                ]}
            />
        </div>
    );
};

export default Main;
