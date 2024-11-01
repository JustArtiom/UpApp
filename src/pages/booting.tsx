import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/loading";

export default function Booting() {
    const [opacity, setOpacity] = useState(100);
    const [error, setError] = useState<string | null>(null);
    const transitionTime = useMemo<number>(() => 250, []);
    const navigate = useNavigate();

    useEffect(() => {
        async function doStuff() {
            try {
                await window.api.db.setdbPath("./.db");
                await window.api.db.initialize();
                const servers = await window.api.db.getServers();
                console.log(servers);

                // Just so it looks cool
                await new Promise((res) => setTimeout(res, 1000));

                console.log("successfully loaded");
                setOpacity(0);
                setTimeout(() => {
                    if (servers.length <= 0) {
                        navigate("/welcome");
                    }
                }, transitionTime);
            } catch (err) {
                setError(err.toString());
            }
        }

        doStuff();
    }, []);

    return (
        <div
            className={`flex-1 flex flex-col justify-center items-center transition-opacity `}
            style={{
                opacity: opacity / 100,
                transitionDuration: transitionTime.toString() + "ms",
            }}
        >
            <p className="mb-10 font-bold text-2xl">
                {!error ? "Developing Your Journey" : "Oh no..."}
            </p>

            {!error ? (
                <Loading size="sm" />
            ) : (
                <p className="text-red-400 max-w-[60%] text-center">{error}</p>
            )}
        </div>
    );
}
