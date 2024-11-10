import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/Button";
import { useServerContext } from "~/context/ServersContext";
import Navigation from "~/layouts/Navigation";
import { Storage } from "~/utils/services/s3";
import { ReactComponent as LinkIcon } from "~/assets/svg/link.svg";
import { useNotificationContext } from "~/context/NotificationContext";
const FilePreview = () => {
    const { server_id, bucket_id, file_id } = useParams();
    const navigate = useNavigate();
    const { servers } = useServerContext();
    const { sendNotification } = useNotificationContext();
    const current_server = servers?.find((x) => x.id === server_id);
    const current_bucket = bucket_id || Storage.defaultBucket;

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

    return (
        <div className="w-full h-full flex p-4 gap-4 relative ">
            <Navigation />
            <div className="flex-1 p-5">
                <div className="flex flex-row items-center mb-5">
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        {"<"} Go back
                    </Button>
                    <p className="ml-3 font-bold text-xl flex-1">{`/${current_bucket}/${file_id}`}</p>
                    <Button
                        size="md"
                        className="text-gray-500 hover:text-white"
                        onClick={() => {
                            handleCopy(
                                `${
                                    current_server.alias ||
                                    current_server.fullUrl
                                }/${current_bucket}/${file_id}`
                            );
                        }}
                    >
                        <LinkIcon className="w-[25px]" />
                    </Button>
                </div>
                <div className="flex items-center justify-center">
                    {["mp4"].find((x) => file_id.endsWith(x)) ? (
                        <video controls autoPlay className="w-full">
                            <source
                                src={`${current_server.fullUrl}/${current_bucket}/${file_id}`}
                            />
                        </video>
                    ) : ["png", "jpg", "jpeg"].find((x) =>
                          file_id.endsWith(x)
                      ) ? (
                        <img
                            alt="file preview"
                            src={`${current_server.fullUrl}/${current_bucket}/${file_id}`}
                        />
                    ) : (
                        "Sorry, there is no preview of this file"
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilePreview;
