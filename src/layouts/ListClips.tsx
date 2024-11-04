import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from "~/components/Button";
import Loading from "~/components/loading";
import { useServerContext } from "~/context/ServersContext";
import { ReactComponent as FolderIcon } from "~/assets/svg/folder.svg";
import { ReactComponent as FileIcon } from "~/assets/svg/file.svg";
import FileCard from "~/components/fileCard";
import { Storage } from "~/utils/services/s3";

const ListClips = () => {
    const { servers } = useServerContext();
    const { server_id, bucket_id } = useParams();

    const [buckets, setBuckets] = useState<any[]>(undefined);
    const [files, setFiles] = useState<any[]>(undefined);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const current_server = servers?.find((x) => x.id === server_id);

    // Define the fetch function
    const fetchData = useCallback(async () => {
        if (!current_server) return;
        setLoading(true);
        setError(undefined);

        try {
            const buckets = await current_server.fetchBuckets();
            setBuckets(buckets);
            const files = await current_server.fetchBucketFiles(
                bucket_id || Storage.defaultBucket
            );
            setFiles(files);
            console.log(buckets);
            console.log(files);
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    }, [current_server, bucket_id]);

    useEffect(() => {
        fetchData();

        // Clear
        return () => {
            setLoading(true);
            setError(undefined);
            setBuckets(undefined);
            setFiles(undefined);
        };
    }, [fetchData]);

    if (error)
        return (
            <div>
                <div className="flex w-full flex-1 justify-center items-center gap-2 flex-col p-5">
                    <p className="text-xl font-bold">
                        Couldn't load your files
                    </p>
                    <p className="max-w-[500px] text-center text-red-400">
                        {error}
                    </p>
                    <Button
                        variant="primary"
                        size="md"
                        className="w-[200px] mt-5"
                        onClick={fetchData} // Retry on button click
                    >
                        Try again
                    </Button>
                    <Button variant="primary" size="md" className="w-[200px]">
                        Update server details
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        onHover="danger"
                        className="w-[200px] border-red-500"
                    >
                        Delete server
                    </Button>
                </div>
            </div>
        );

    if (isLoading)
        return (
            <div className="flex w-full flex-1 justify-center items-center gap-2 p-5">
                <Loading size="sm" />
                <p>Loading your files</p>
            </div>
        );

    return (
        <div className="flex gap-3 flex-wrap">
            {buckets
                .filter((x) => x.name != Storage.defaultBucket)
                .map((bucket, i) => (
                    <FileCard
                        key={i}
                        name={bucket.name}
                        date={bucket.creationDate}
                        overlay={{
                            Icon: FolderIcon,
                        }}
                        variant="block"
                    />
                ))}
            {files.map((file, i) => (
                <FileCard
                    key={i}
                    name={file.name}
                    date={file.lastModified}
                    bgImage={`https://i.artiom.me/cdn/.banner-${encodeURI(
                        file.name
                    )}.png`}
                    overlay={{
                        Icon: FileIcon,
                    }}
                    variant="block"
                />
            ))}
        </div>
    );
};

export default ListClips;
