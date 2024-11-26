import { SettingsProvider } from "./SettingsContext";
import { NotificationProvider } from "./NotificationContext";
import { ServerProvider } from "./ServersContext";
import { ModalProvider } from "./ModalContext";

const AllContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SettingsProvider>
            <ServerProvider>
                <ModalProvider>
                    <NotificationProvider>{children}</NotificationProvider>
                </ModalProvider>
            </ServerProvider>
        </SettingsProvider>
    );
};

export default AllContextProvider;
