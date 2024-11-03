import Button from "~/components/Button";
import { useUserContext } from "~/context/UserContext";
import { ReactComponent as PlusIcon } from "~/assets/svg/add.svg";
import { ReactComponent as FolderCreateIcon } from "~/assets/svg/create-folder.svg";
import Navigation from "~/layouts/Navigation";

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

    return (
        <div className="w-full h-full flex p-4 gap-4">
            <Navigation />
            <div className="flex-1 p-10">
                <p className="mb-5  text-2xl font-bold">
                    Welcome {username || "Traveler"}
                </p>
                <div className="my-10 flex gap-10 flex-wrap">
                    {actionButtons.map((act) => (
                        <Button
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
            </div>
        </div>
    );
};

export default AppMainPage;
