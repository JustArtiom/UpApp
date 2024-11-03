import Button from "../Button";
import CheckBox from "../checkbox";
import Input from "../Input";
import React from "react";

const AddServerForm = ({
    askFirstName,
    isLoading,
    ...props
}: {
    askFirstName?: boolean;
    isLoading?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
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
                required
            />
            <CheckBox
                id={"ssl"}
                name={"ssl"}
                labelTitle={"Use Secure Socket Layer (SSL)"}
                lablelClassName="text-gray-500 text-sm"
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
            >
                Connect
            </Button>
        </form>
    );
};

export default AddServerForm;
