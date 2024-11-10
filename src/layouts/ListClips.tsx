import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/Button";
import Loading from "~/components/loading";
import { useServerContext } from "~/context/ServersContext";
import { ReactComponent as FolderIcon } from "~/assets/svg/folder.svg";
import { ReactComponent as FileIcon } from "~/assets/svg/file.svg";
import FileCard from "~/components/fileCard";
import { Storage } from "~/utils/services/s3";
import { useNotificationContext } from "~/context/NotificationContext";
import Modal from "~/components/modal";

const ListClips = ({
    variant,
    filter,
    handleReload,
}: {
    variant: "row" | "block";
    filter?: string;
    handleReload: Function;
}) => {
    const { servers } = useServerContext();
    const { server_id, bucket_id } = useParams();
    const { sendNotification } = useNotificationContext();
    const navigate = useNavigate();

    const [buckets, setBuckets] = useState<any[]>(undefined);
    const [files, setFiles] = useState<any[]>(undefined);
    const [deleteFile, setDeleteFile] = useState<null | {
        fname: string;
        aproved?: boolean;
    }>(null);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const current_server = servers?.find((x) => x.id === server_id);
    const current_bucket = bucket_id || Storage.defaultBucket;
    const isDefault = current_bucket === Storage.defaultBucket;

    // Define the fetch function
    const fetchData = useCallback(async () => {
        if (!current_server) return;
        setLoading(true);
        setError(undefined);

        try {
            const buckets = await current_server.fetchBuckets();
            setBuckets(buckets);
            const files = await current_server.fetchBucketFiles(current_bucket);
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

    useEffect(() => {
        if (deleteFile && deleteFile.aproved)
            current_server
                .fileDelete(current_bucket, deleteFile.fname)
                .then(() => {
                    setFiles(null);
                    handleReload();
                    sendNotification("File deleted successfully", "success");
                })
                .catch((err) =>
                    sendNotification("Error Deleting file. " + err, "error")
                );
    }, [deleteFile]);

    const handleCopy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                sendNotification(
                    "Successfully coppied to clipboard",
                    "success"
                );
            })
            .catch(() => {
                sendNotification("Error coppying to clipboard", "error");
            });
    };

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
        <div className="flex flex-wrap">
            {deleteFile && !deleteFile.aproved ? (
                <Modal>
                    <p className="text-center text-lg font-bold">
                        Are you sure you want to delete
                    </p>
                    <p className="text-center mb-4">{deleteFile.fname}</p>
                    <div className="flex justify-around">
                        <Button
                            variant="primary"
                            size="md"
                            onHover="danger"
                            onClick={() => {
                                setDeleteFile((x) => ({ ...x, aproved: true }));
                            }}
                        >
                            Yes, delete it
                        </Button>
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => setDeleteFile(null)}
                        >
                            No, dont delete
                        </Button>
                    </div>
                </Modal>
            ) : (
                ""
            )}
            {isDefault ? (
                buckets
                    .filter((x) => x.name != Storage.defaultBucket)
                    .filter((x) =>
                        x.name
                            ?.toLowerCase()
                            .includes(filter?.toLowerCase() || "")
                    )
                    .map((bucket, i) => (
                        <FileCard
                            key={i}
                            name={bucket.name}
                            date={bucket.creationDate}
                            overlay={{
                                Icon: FolderIcon,
                            }}
                            variant={variant}
                            onClick={() => {
                                navigate(
                                    `/${current_server.id}/${bucket.name}`
                                );
                            }}
                            allowEdit
                            onEdit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            allowDelete
                            onDelete={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                    ))
            ) : (
                <FileCard
                    name={"../"}
                    overlay={{
                        Icon: FolderIcon,
                    }}
                    variant={variant}
                    onClick={() => {
                        navigate(`/${current_server.id}/`);
                    }}
                />
            )}
            {files
                .filter((x) =>
                    x.name?.toLowerCase().includes(filter?.toLowerCase() || "")
                )
                .filter((x) => !x.name.startsWith(".thub"))
                .map((file, i) => (
                    <FileCard
                        key={i}
                        name={file.name}
                        date={file.lastModified}
                        size={file.size}
                        bgImage={
                            file.name.endsWith("mp4")
                                ? `${current_server.ssl ? "https" : "http"}://${
                                      current_server.id
                                  }/${current_bucket}/.thub_${encodeURI(
                                      file.name
                                  )}.jpg`
                                : ["jpg", "jpeg", "png"].find((x) =>
                                      file.name.endsWith(x)
                                  )
                                ? `${current_server.ssl ? "https" : "http"}://${
                                      current_server.id
                                  }/${current_bucket}/${encodeURI(file.name)}`
                                : ""
                        }
                        overlay={{
                            Icon: FileIcon,
                        }}
                        variant={variant}
                        onClick={() => {
                            navigate(
                                `/${
                                    current_server.id
                                }/${current_bucket}/${encodeURI(file.name)}`
                            );
                        }}
                        allowLink
                        onLink={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopy(
                                (current_server.alias ||
                                    `${
                                        current_server.ssl ? "https" : "http"
                                    }://${current_server.id}`) +
                                    `/${current_bucket}/${encodeURI(file.name)}`
                            );
                        }}
                        allowEdit
                        onEdit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        allowDelete
                        onDelete={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            setDeleteFile({ fname: file.name });
                        }}
                    />
                ))}
        </div>
    );
};

export default ListClips;
