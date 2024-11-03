import { useNotificationContext } from "~/context/NotificationContext";
import Button from "../components/Button";
import CheckBox from "../components/checkbox";
import Input from "../components/Input";
import React, { useEffect, useState } from "react";

const AddServerForm = ({
    askFirstName,
    isLoading,
    ...props
}: {
    askFirstName?: boolean;
    isLoading?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
    const { notifications } = useNotificationContext();

    const [notiflen, setNotiflen] = useState(0);
    const [iperr, setIperr] = useState(false);
    const [unameerr, setUnameerr] = useState(false);
    const [passerr, setPasserr] = useState(false);
    const [sslerr, setSslerr] = useState(false);

    useEffect(() => {
        const errors = notifications
            .filter((x) => x.type == "error")
            .map((x) => x.message);
        if (notiflen > notifications.length) {
            setNotiflen(notifications.length);
            return;
        }
        setNotiflen(notifications.length);

        if (
            errors.find((x) => x.includes("getaddrinfo ENOTFOUND")) ||
            errors.find((x) => x.includes("connect ETIMEDOUT")) ||
            errors.find((x) => x.includes("connect ECONNREFUSED")) ||
            errors.find((x) => x.includes("302")) ||
            errors.find((x) => x.includes("socket hang up"))
        ) {
            setIperr(true);
        }

        if (
            errors.find((x) =>
                x.includes(
                    "The Access Key Id you provided does not exist in our records"
                )
            )
        ) {
            setUnameerr(true);
        }

        if (
            errors.find((x) =>
                x.includes(
                    "The request signature we calculated does not match the signature you provided. Check your key and signing method."
                )
            )
        ) {
            setPasserr(true);
        }

        if (errors.find((x) => x.includes("SSL"))) {
            setSslerr(true);
        }
    }, [notifications]);

    return (
        <form {...props}>
            {askFirstName ? (
                <Input
                    id={"yourName"}
                    name={"yourName"}
                    labelTitle={
                        <p className="text-lg p-2 pt-3">
                            Your Name{" "}
                            <span className="text-gray-600 font-normal text-sm">
                                (optional)
                            </span>
                        </p>
                    }
                    variant="transparent"
                    placeholder="Nathan"
                    border="primary"
                />
            ) : (
                ""
            )}
            <div className="flex gap-5">
                <Input
                    id={"serverIp"}
                    name={"serverIp"}
                    labelTitle={<p className="text-lg p-2 pt-3">Server Ip</p>}
                    variant="transparent"
                    placeholder="127.0.0.1"
                    border="primary"
                    divClassName="flex-1"
                    className={iperr ? "border-red-500 shake-error" : ""}
                    onChange={() => setIperr(false)}
                    required
                />
                <Input
                    id={"serverPort"}
                    name={"serverPort"}
                    labelTitle={<p className="text-lg p-2 pt-3">Port</p>}
                    variant="transparent"
                    type="number"
                    border="primary"
                    placeholder="4000"
                    divClassName="w-[100px]"
                    className={iperr ? "border-red-500 shake-error" : ""}
                    onChange={() => setIperr(false)}
                    required
                />
            </div>
            <Input
                id={"username"}
                name={"username"}
                labelTitle={<p className="text-lg p-2 pt-3">Username</p>}
                variant="transparent"
                border="primary"
                placeholder="Nathannnn69"
                className={unameerr ? "border-red-500 shake-error" : ""}
                onChange={() => setUnameerr(false)}
                required
            />
            <Input
                id={"password"}
                name={"password"}
                labelTitle={<p className="text-lg p-2 pt-3">Password</p>}
                type="password"
                variant="transparent"
                border="primary"
                placeholder="shhhh..."
                className={passerr ? "border-red-500 shake-error" : ""}
                onChange={() => setPasserr(false)}
                required
            />
            <CheckBox
                id={"ssl"}
                name={"ssl"}
                labelTitle={"Use Secure Socket Layer (SSL)"}
                lablelClassName={
                    `text-sm ` +
                    (sslerr ? "text-red-500 shake-error" : "text-gray-500")
                }
                onChange={() => setSslerr(false)}
            ></CheckBox>
            <CheckBox
                id={"pp&tnc"}
                labelTitle={
                    "By checking this box you agree to our terms of service and privacy policy"
                }
                lablelClassName="text-gray-500 text-sm"
                required
            ></CheckBox>
            <Button
                type="submit"
                variant="primary"
                size="md"
                className="mx-auto mt-5 w-[110px] h-[50px]"
                isLoading={isLoading}
                disabled={isLoading}
            >
                Connect
            </Button>
        </form>
    );
};

export default AddServerForm;
