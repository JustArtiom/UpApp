import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Form from "~/components/Form";
import { useSettingsContext } from "~/context/SettingsContext";
import useRedirect from "~/hooks/useRedirect";

const Name = () => {
    const { settings, updateSettings } = useSettingsContext();
    const redirect = useRedirect();
    const [searchParams, _] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/app";
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Next redirect", redirectTo);

        if (typeof settings?.name == "string") {
            console.warn(
                "Redirecting because settings.name is a string already"
            );
            redirect(redirectTo, 0);
        }
    }, []);

    if (typeof settings?.name == "string") return <></>;

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Submited form");
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        let name = formData.get("name") as string;
        name = name ? name.replace(/^./, name[0].toUpperCase()) : "";

        await updateSettings({ name });
        console.log("Name set:", name);
        setLoading(false);

        redirect(redirectTo);
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Form
                onSubmit={handleFormSubmit}
                className="w-[300px] gap-5"
                attributes={[
                    {
                        type: "title",
                        attributes: {
                            children: "What's your name?",
                        },
                    },
                    {
                        type: "input",
                        attributes: {
                            id: "name",
                            placeholder: "Artiom",
                        },
                    },
                    {
                        type: "button",
                        attributes: {
                            type: "submit",
                            children: "Continue",
                            className: "w-[120px] mx-auto",
                            isLoading: isLoading,
                            disabled: isLoading,
                        },
                    },
                ]}
            />
        </div>
    );
};

export default Name;
