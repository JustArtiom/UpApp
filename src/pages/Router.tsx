import { Routes, Route, HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Booting from "./booting";
import Welcome from "./welcome";
import ActionBar from "~/components/actionBar";
import ContextProvider from "~/context";
import NotificationLayout from "~/layouts/notifications";

function ErrorFallback({ error }: { error: any }) {
    return (
        <div
            role="alert"
            className="flex items-center flex-1 justify-center flex-col"
        >
            <p className="font-bold text-2xl mb-5">Render Error</p>
            <pre className="max-w-[60%] text-red-400">{error.message}</pre>
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

export default function Router() {
    return (
        <Layout>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Booting />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="*" element={<>404 {document.URL}</>} />
                </Routes>
            </HashRouter>
        </Layout>
    );
}
