import { Routes, Route, HashRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Booting from "./booting";
import Welcome from "./welcome";
import ActionBar from "~/components/actionBar";

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

export default function Router() {
    return (
        <div className="h-screen flex flex-col">
            <ActionBar />

            <div
                id="appbody"
                className="flex-1 overflow-y-auto custom-scrollbar"
            >
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<Booting />} />
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="*" element={<>404 {document.URL}</>} />
                        </Routes>
                    </HashRouter>
                </ErrorBoundary>
            </div>
        </div>
    );
}
