import { useState } from "react";
import Button from "~/components/Button";
import Loading from "~/components/loading";

const ListClips = () => {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState("Couldnt load your files... because...");

    if (error)
        return (
            <div>
                <div className="flex w-full flex-1 justify-center items-center gap-2 flex-col p-5">
                    <p className="text-xl font-bold">Couldnt load your files</p>
                    <p className="max-w-[500px] text-center text-red-400">
                        Error: i think something went wrong.. idk i just
                        think... probably because i have no fucking file to
                        render
                    </p>
                    <Button
                        variant="primary"
                        size="md"
                        className="w-[200px] mt-5"
                    >
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

    return <div>Hello</div>;
};

export default ListClips;
