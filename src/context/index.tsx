import { NotificationProvider } from "./NotificationContext";
import { ServerProvider } from "./ServersContext";
import { UserProvider } from "./UserContext";
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NotificationProvider>
            <ServerProvider>
                <UserProvider>{children}</UserProvider>
            </ServerProvider>
        </NotificationProvider>
    );
};

export default ContextProvider;
