import Button from "~/components/Button";
import { useUserContext } from "~/context/UserContext";
import { ReactComponent as PlusIcon } from "~/assets/svg/add.svg";
import { ReactComponent as FolderCreateIcon } from "~/assets/svg/create-folder.svg";
import Navigation from "~/layouts/Navigation";
import SearchBar from "~/components/search";
import ListClips from "~/layouts/ListClips";
import FileDropOverlay from "~/components/FIleDropOverlay";
import { useEffect, useRef, useState } from "react";
import { useServerContext } from "~/context/ServersContext";
import { useParams } from "react-router-dom";
import { useNotificationContext } from "~/context/NotificationContext";
import { ReactComponent as ReloadIcon } from "~/assets/svg/reload.svg";
import { Storage } from "~/utils/services/s3";
import { ReactComponent as RowIcon } from "~/assets/svg/row.svg";
import { ReactComponent as BlockIcon } from "~/assets/svg/block.svg";
import Modal from "~/components/modal";
import Input from "~/components/Input";

const AppMainPage = () => {
    const actionButtons = [
        {
            Icon: PlusIcon,
            title: "Upload",
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {},
        },
    ];

    const { username } = useUserContext();
    const { servers } = useServerContext();
    const { sendNotification } = useNotificationContext();
    const { server_id, bucket_id } = useParams();
    const current_server = servers?.find((x) => x.id === server_id);
    const current_bucket = bucket_id || Storage.defaultBucket;
    const isDefaultBucket = current_bucket == Storage.defaultBucket;
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [displayType, setDisplayType] = useState<"row" | "block">("row");
    const [searchValue, setSearchValue] = useState("");
    const [createFolder, setCreateFolder] = useState<boolean | string>(false);
    const folderNameRef = useRef<HTMLInputElement>(null);

    if (isDefaultBucket) {
        actionButtons.push({
            Icon: FolderCreateIcon,
            title: "Create Folder",
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                e.preventDefault();

                setCreateFolder(true);
            },
        });
    }

    const handleReload = () => {
        setReloadKey((prev) => prev + 1);
    };

    const handleDragEnter = () => {
        setOverlayVisible(true);
    };

    const handleDragLeave = () => {
        setOverlayVisible(false);
    };

    const handleFileDrop = async (file: File) => {
        setOverlayVisible(false);

        if (!current_server)
            return sendNotification(
                "No current server active to upload",
                "error"
            );

        let fileArrayBuffer: ArrayBuffer;

        try {
            sendNotification(`Uploading ...`, "warning");

            fileArrayBuffer = await file.arrayBuffer();

            await current_server.uploadFile(
                current_bucket,
                file.name,
                fileArrayBuffer,
                undefined,
                file.type
            );

            navigator.clipboard
                .writeText(
                    `${
                        current_server.alias || current_server.fullUrl
                    }/${current_bucket}/${file.name}`
                )
                .catch(() => {});

            sendNotification(
                `Successfully uploaded ${file.name} and copied the url to clipboard`,
                "success"
            );
        } catch (err) {
            console.error(err);
            sendNotification(err.toString(), "error");
        } finally {
            fileArrayBuffer = null;
            handleReload();
        }
    };

    useEffect(() => {
        if (typeof createFolder == "string" && createFolder.length) {
            current_server
                .createBucket(createFolder)
                .then(() => {
                    current_server.makeBucketPublic(createFolder, "/");
                    sendNotification("Create folder successfully", "success");
                })
                .catch((err) => {
                    sendNotification(err.toString(), "error");
                })
                .finally(() => {
                    setCreateFolder(false);
                    handleReload();
                });
        }
    }, [createFolder]);

    return (
        <div
            className="w-full h-full flex p-4 gap-4 relative"
            onDragEnter={handleDragEnter}
        >
            {createFolder === true ? (
                <Modal>
                    <Input
                        ref={folderNameRef}
                        id={"folderName"}
                        name={"folderName"}
                        placeholder="Folder Name"
                        variant="transparent"
                        border="primary"
                        sizeType="md"
                    />
                    <Button
                        className="mx-auto my-3"
                        size="md"
                        variant="primary"
                        onClick={() => {
                            if (folderNameRef.current)
                                setCreateFolder(folderNameRef.current.value);
                        }}
                    >
                        Create folder
                    </Button>
                    <Button
                        className="mx-auto underline my-1 p-2"
                        onClick={() => {
                            setCreateFolder(false);
                        }}
                    >
                        cancel
                    </Button>
                </Modal>
            ) : (
                ""
            )}

            <Navigation />
            <div className="flex flex-col min-h-full w-full p-10 overflow-y-auto">
                <p className="mb-5 text-2xl font-bold">
                    Welcome {username || "Traveler"}
                </p>
                <div className="my-10 flex gap-10 flex-wrap">
                    {actionButtons.map((act, i) => (
                        <Button
                            key={i}
                            className="w-[250px] h-[130px] rounded-xl items-start p-10 py-[30px] flex-col text-gray-500 hover:text-white hover:bg-transparent hover:border-white"
                            variant="primary"
                            onClick={act.onClick}
                        >
                            <act.Icon className="w-[30px]" />
                            <div className="flex-1" />
                            <p className="">{act.title}</p>
                        </Button>
                    ))}
                </div>
                <p className="my-5 text-xl font-bold mr-5">
                    All files
                    <span className="ml-3 font-normal text-base">
                        {!isDefaultBucket ? "/" + current_bucket : ""}
                    </span>
                </p>
                <div className="flex my-5 gap-2 ">
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        className="px-2 rounded-md"
                        onClick={(e) => {
                            const button = e.currentTarget;

                            if (button) {
                                button.style.animation =
                                    "spin360 0.2s ease forwards";

                                button.addEventListener(
                                    "animationend",
                                    () => {
                                        if (button) button.style.animation = "";
                                    },
                                    { once: true }
                                );
                            }

                            handleReload();
                        }}
                    >
                        <ReloadIcon className="w-[20px]" />
                    </Button>

                    <Button
                        onClick={() => {
                            setDisplayType((x) =>
                                x == "row" ? "block" : "row"
                            );
                        }}
                    >
                        {displayType == "row" ? (
                            <RowIcon className="w-[25px]" />
                        ) : (
                            <BlockIcon className="w-[25px] h-[25px]" />
                        )}
                    </Button>
                </div>
                <ListClips
                    key={reloadKey}
                    variant={displayType}
                    filter={searchValue}
                    handleReload={handleReload}
                />
            </div>
            <FileDropOverlay
                onDragLeave={handleDragLeave}
                onFileDrop={handleFileDrop}
                isVisible={isOverlayVisible}
            />
        </div>
    );
};

export default AppMainPage;
