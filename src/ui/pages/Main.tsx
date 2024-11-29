import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "~/components/Button";
import { ServerDataProvider } from "~/context/ServerDataContext";
import { useServerContext } from "~/context/ServersContext";
import useRedirect from "~/hooks/useRedirect";
import ServerLayout from "~/layouts/ServerLayout";
import { S3 } from "~/utils/s3";

const Main = () => {
    const { servers } = useServerContext();
    const { server_id, bucket_id } = useParams();
    const redirect = useRedirect("server-body");
    const current_server = servers.find((x) => x.id == server_id);

    useEffect(() => {
        if (!current_server && servers.length) {
            redirect(`/app/${servers[0].id}`, 1000);
            return;
        } else if (!current_server) {
            console.warn("No servers available to select");
            return;
        } else if (!bucket_id) {
            redirect(`/app/${server_id}/${S3.defaultBucket}`);
            return;
        }

        console.log("Selected server:", current_server.id);
    }, [current_server]);

    if (!current_server)
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-5">
                <p className="mb-3 text-xl font-semibold">
                    It appears you have no servers
                </p>
                <Button onClick={() => redirect("/add-server")}>
                    Add a server
                </Button>
            </div>
        );

    return (
        <ServerDataProvider s3={current_server}>
            <ServerLayout />
        </ServerDataProvider>
    );
};

export default Main;
