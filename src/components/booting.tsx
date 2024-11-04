import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/loading";
import { useServerContext } from "~/context/ServersContext";
import { useUserContext } from "~/context/UserContext";
import { Storage } from "~/utils/services/s3";

export default function Booting({ children }: { children: React.ReactNode }) {
    const [opacity, setOpacity] = useState(100);
    const [render, setRender] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const transitionTime = useMemo<number>(() => 500, []);
    const navigate = useNavigate();
    const { servers: serversCtx, addServer } = useServerContext();
    const { setUsername } = useUserContext();

    useEffect(() => {
        async function doStuff() {
            try {
                console.log("Start booting");
                console.log(await window.api.db.setdbPath(".db"));
                console.log("Database path set");
                await window.api.db.initialize();
                console.log("Database initialized");
                const servers = await window.api.db.getServers();
                const username = await window.api.db.getUser();
                console.log("Database fetch completed");

                if (username) {
                    setUsername(username.name);
                } else {
                    setUsername(null);
                }

                // Just so it looks cool
                await new Promise((res) => setTimeout(res, 1000));

                if (servers.length) {
                    for (let server of servers) {
                        const scleint = new Storage(
                            server.ip,
                            server.port,
                            server.public,
                            server.secret,
                            !!server.ssl
                        );
                        await scleint.createClient();
                        if (await scleint.ping()) {
                            await scleint.initializeDefault();
                        }
                        addServer(scleint);
                    }
                }

                console.log("Finished Booting");
                setOpacity(0);
                if (servers.length <= 0) {
                    setTimeout(async () => {
                        navigate("/add-server");
                        setRender(true);
                    }, transitionTime);
                }
            } catch (err) {
                setError(err.toString());
                console.error(err);
            }
        }

        doStuff();
    }, []);

    useEffect(() => {
        if (serversCtx?.length) {
            setOpacity(0);
            setTimeout(() => {
                navigate(`/${encodeURI(serversCtx[0].id)}`);
                setRender(true);
            }, transitionTime);
        }
    }, [serversCtx]);

    return !render ? (
        <div
            className={`h-full flex flex-col justify-center items-center transition-opacity p-10`}
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
    ) : (
        <>{children}</>
    );
}
