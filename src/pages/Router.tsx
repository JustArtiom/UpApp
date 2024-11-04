import { Routes, Route, HashRouter, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Booting from "~/components/booting";
import AddServer from "./addServer";
import ActionBar from "~/components/actionBar";
import ContextProvider from "~/context";
import NotificationLayout from "~/layouts/notifications";
import AppMainPage from ".";
import { useServerContext } from "~/context/ServersContext";
import { useEffect } from "react";

function ErrorFallback({ error }: { error: any }) {
    return (
        <div
            role="alert"
            className="flex items-center flex-1 justify-center flex-col"
        >
            <p className="font-bold text-2xl mb-5 mt-5">Render Error</p>
            <pre className="max-w-[60%] text-red-400 break-words whitespace-pre-wrap ">
                {error.message}
            </pre>
        </div>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <ContextProvider>
                <NotificationLayout />
                <ActionBar />

                <div
                    id="appbody"
                    className="flex-1 overflow-y-auto custom-scrollbar"
                >
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        {children}
                    </ErrorBoundary>
                </div>
            </ContextProvider>
        </div>
    );
}

const HandleServerSelection = () => {
    const { servers } = useServerContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (servers.length) navigate(`/${servers[0].id}`);
        else navigate(`/add-server`);
    }, [servers]);
    return <div></div>;
};

export default function Router() {
    return (
        <Layout>
            <HashRouter>
                <Booting>
                    <Routes>
                        <Route path="/" element={<HandleServerSelection />} />
                        <Route path="/add-server" element={<AddServer />} />
                        <Route path="/:server_id" element={<AppMainPage />} />
                        <Route
                            path="/:server_id/:bucket_id"
                            element={<AppMainPage />}
                        />
                        <Route path="*" element={<>404 {document.URL}</>} />
                    </Routes>
                </Booting>
            </HashRouter>
        </Layout>
    );
}
