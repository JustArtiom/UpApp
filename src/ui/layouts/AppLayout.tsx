import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import Navigator from "~/components/Navigator";
import ErrorFallback from "./ErrorFallback";

const AppLayout = () => {
    return (
        <div className="w-full h-full flex p-5 gap-5">
            <Navigator />
            <div id="server-body" className="flex-1 flex transition-opacity">
                <ErrorBoundary fallbackRender={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default AppLayout;
