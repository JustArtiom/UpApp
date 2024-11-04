import Button from "~/components/Button";
import { useUserContext } from "~/context/UserContext";
import { ReactComponent as PlusIcon } from "~/assets/svg/add.svg";
import { ReactComponent as FolderCreateIcon } from "~/assets/svg/create-folder.svg";
import Navigation from "~/layouts/Navigation";
import SearchBar from "~/components/search";
import ListClips from "~/layouts/ListClips";
import FileDropOverlay from "~/components/FIleDropOverlay";
import { useState } from "react";

const actionButtons = [
    {
        Icon: PlusIcon,
        title: "Upload",
    },
    {
        Icon: FolderCreateIcon,
        title: "Create Folder",
    },
];

const AppMainPage = () => {
    const { username } = useUserContext();
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const handleDragEnter = () => {
        setOverlayVisible(true);
    };

    const handleDragLeave = () => {
        setOverlayVisible(false);
    };

    const handleFileDrop = async (file: File) => {
        setOverlayVisible(false);

        console.log("now what...?");
    };

    return (
        <div
            className="w-full h-full flex p-4 gap-4 relative"
            onDragEnter={handleDragEnter}
        >
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
                        >
                            <act.Icon className="w-[30px]" />
                            <div className="flex-1" />
                            <p className="">{act.title}</p>
                        </Button>
                    ))}
                </div>
                <p className="my-5 text-xl font-bold">All files</p>
                <div className="flex my-5">
                    <SearchBar />
                </div>
                <ListClips />
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
