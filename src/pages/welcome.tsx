import { useEffect, useMemo, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";

export default function Welcome() {
    const [opacity, setOpacity] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const transitionTime = useMemo(() => 1000, []);

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

    return (
        <div
            className="transition-all w-full min-h-full flex flex-col items-center justify-center py-10"
            style={{
                opacity: opacity,
                transitionDuration: transitionTime + "ms",
                transform: animate ? "translateY(0)" : "translateY(calc(20vh))",
            }}
        >
            <div className="flex flex-col items-center w-full">
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
                    <Input
                        id={"You name"}
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
                    <div className="flex gap-5">
                        <Input
                            id={"Server Ip"}
                            labelTitle={
                                <p className="text-lg p-2 pt-3">Server Ip</p>
                            }
                            variant="transparent"
                            placeholder="127.0.0.1"
                            border="primary"
                            divClassName="flex-1"
                        />
                        <Input
                            id={"Server Port"}
                            labelTitle={
                                <p className="text-lg p-2 pt-3">Port</p>
                            }
                            variant="transparent"
                            border="primary"
                            placeholder="4000"
                            divClassName="w-[100px]"
                        />
                    </div>
                    <Input
                        id={"Username"}
                        labelTitle={
                            <p className="text-lg p-2 pt-3">Username</p>
                        }
                        variant="transparent"
                        border="primary"
                        placeholder="Nathannnn69"
                    />
                    <Input
                        id={"Password"}
                        labelTitle={
                            <p className="text-lg p-2 pt-3">Password</p>
                        }
                        type="password"
                        variant="transparent"
                        border="primary"
                    />
                    <div className="mt-5 flex justify-center">
                        <Button
                            variant="primary"
                            size="md"
                            className="w-[110px]"
                            isLoading={isLoading}
                            disabled={isLoading}
                            onClick={() => {
                                setIsLoading((a) => !a);
                            }}
                        >
                            Connect
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
