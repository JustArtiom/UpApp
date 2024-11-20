import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import Loading from "~/components/Loading";
import { useSettingsContext } from "~/context/SettingsContext";
import useRedirect from "~/hooks/useRedirect";
import sleep from "~/utils/sleep";

const Booting = ({ children }: { children: React.ReactNode }) => {
    const [isLoaded, setLoaded] = useState(false);
    const { showBoundary } = useErrorBoundary();
    const { setSettings } = useSettingsContext();
    const redirect = useRedirect();

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
            "Loaded servers: ",
            servers.map(({ password, username, ...props }) => props)
        );

        await sleep(1000);

        if (settin?.name == null)
            await redirect(
                "/name?redirectTo=" + (servers.length ? "/app" : "/add-server")
            );
        else if (!servers.length) await redirect("/add-server");
        else await redirect("/");
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
