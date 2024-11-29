import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import Loading from "~/components/Loading";
import { useNotificationContext } from "~/context/NotificationContext";
import { useServerContext } from "~/context/ServersContext";
import { useSettingsContext } from "~/context/SettingsContext";
import useRedirect from "~/hooks/useRedirect";
import { S3 } from "~/utils/s3";
import sleep from "~/utils/sleep";

const Booting = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setLoaded] = useState(false);
    const { showBoundary } = useErrorBoundary();
    const { setSettings } = useSettingsContext();
    const { sendNotification } = useNotificationContext();
    const { addServer } = useServerContext();
    const redirect = useRedirect();
    const location = useLocation();

    useEffect(() => {
        console.log(`Location: ${location.pathname}${location.hash}`);
    }, [location]);

    const SetupProject = async () => {
        console.log("Booting...");

        const appVersion = window.api.version;
        console.log("UpApp v" + appVersion);

        await window.api.db.setup();
        console.log("Database initialized");

        const settin = await window.api.db.getSettings();
        console.log("Database v" + settin.version);
        console.log("Loaded settings: ", settin);
        setSettings(settin);

        if (settin.version !== appVersion)
            console.warn(
                "The app and database file versions mismatch. Things are expected to go wrong"
            );

        const servers = await window.api.db.getServers();
        console.log(
            "Loaded",
            servers.length,
            "server(s): ",
            servers.map(({ password, username, ...props }) => props)
        );

        for (let server of servers) {
            const s3 = new S3(
                server.ip,
                server.port,
                server.username,
                server.password,
                !!server.ssl,
                server.alias
            );

            await s3.createClient();

            try {
                await s3.ping();
                console.log("Server", s3.id, "successfully pinged");

                const bkts = await s3.fetchBuckets();
                if (!bkts.find((x) => x.name === S3.defaultBucket)) {
                    await s3.createBucket(S3.defaultBucket);
                }
            } catch (err) {
                console.error("Error fetching the servers", err);
                sendNotification(
                    "The server " +
                        (s3.alias_domain || s3.id) +
                        " couldnt be reached",
                    "warn"
                );
            }

            addServer(s3);
            console.log("Added", s3.id, "to the context");
        }

        await sleep(1000);

        if (settin?.name == null)
            await redirect(
                "/name?redirectTo=" + (servers.length ? "/app" : "/add-server")
            );
        else if (!servers.length) await redirect("/add-server");
        else await redirect("/app");
        setLoaded(true);
    };

    useEffect(() => {
        SetupProject().catch(showBoundary);
    }, []);

    return isLoaded ? (
        <>{children}</>
    ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-2xl font-bold m-5">Developing Your Journey</p>
            <Loading size="sm" />
        </div>
    );
};

export default Booting;
