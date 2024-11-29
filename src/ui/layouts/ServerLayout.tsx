import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import Loading from "~/components/Loading";
import { useServerDataContext } from "~/context/ServerDataContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useRedirect from "~/hooks/useRedirect";

const ServerLayout = () => {
    const redirect = useRedirect();
    const { s3, updateBuckets, updateFiles, currentBucket } =
        useServerDataContext();
    const { settings } = useSettingsContext();

    const [error, setError] = useState("");

    const LoadServer = async () => {
        try {
            const bkts = await updateBuckets();
            await updateFiles(bkts[0].name);
        } catch (err) {
            setError(err.toString());
        }
    };

    useEffect(() => {
        LoadServer();
    }, [s3]);

    if (error)
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-danger text-xl font-semibold mb-3">Error</p>
                <p className="max-w-[300px] mx-5 break-words mb-5 text-center">
                    {error}
                </p>
                <Button onClick={LoadServer}>Retry</Button>
            </div>
        );

    if (!currentBucket)
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-xl font-semibold mb-5">
                    Loading Your server
                </p>
                <Loading size="sm" />
            </div>
        );

    return (
        <div className="flex-1 p-5">
            <p className="text-2xl mb-5 font-bold">
                Hello, {settings.name || "human"}
            </p>
            <p className="font-medium text-xl mb-2">
                Folder: /{currentBucket.name}
            </p>
            <div className="grid mb-2">
                <Checkbox
                    variant="toggle"
                    labelText="Public folder"
                    labelClassName="text-primary"
                />
            </div>
            <div></div>
        </div>
    );
};

export default ServerLayout;
