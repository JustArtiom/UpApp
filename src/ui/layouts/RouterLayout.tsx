import { ErrorBoundary } from "react-error-boundary";
import ActionBar from "~/components/ActionBar";
import ErrorFallback from "./ErrorFallback";
import AllContextProvider from "~/context";
import NotificationLayout from "./NotificationLayout";

const RouterLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AllContextProvider>
            <div className="w-full h-screen flex flex-col">
                <ActionBar />
                <NotificationLayout />
                <div
                    id="app-body" // The root body of the app
                    className="relative w-full flex-1 overflow-y-auto transition-opacity"
                >
                    <ErrorBoundary fallbackRender={ErrorFallback}>
                        {children}
                    </ErrorBoundary>
                </div>
            </div>
        </AllContextProvider>
    );
};

export default RouterLayout;
