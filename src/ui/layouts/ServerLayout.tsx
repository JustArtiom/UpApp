import { useEffect, useState } from "react";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import { useServerDataContext } from "~/context/ServerDataContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useRedirect from "~/hooks/useRedirect";

const ServerLayout = () => {
    const redirect = useRedirect();
    const { s3, updateBuckets, bucketsLoading, updateFiles, filesLoading } =
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

    if (bucketsLoading)
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-xl font-semibold mb-5">
                    Loading Your server
                </p>
                <Loading size="sm" />
            </div>
        );

    return (
        <div className="flex-1">
            <p className="text-2xl m-5 font-bold">
                Hello, {settings.name || "human"}
            </p>
        </div>
    );
};

export default ServerLayout;
