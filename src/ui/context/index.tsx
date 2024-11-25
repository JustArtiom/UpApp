import { SettingsProvider } from "./SettingsContext";
import { NotificationProvider } from "./NotificationContext";

const AllContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SettingsProvider>
            <NotificationProvider>{children}</NotificationProvider>
        </SettingsProvider>
    );
};

export default AllContextProvider;
