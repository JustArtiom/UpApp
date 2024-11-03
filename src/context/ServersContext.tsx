import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from "react";
import AddServer from "~/pages/addServer";
import { Storage } from "~/utils/services/s3";

interface ServersContextType {
    servers: Storage[];
    addServer: (server: Storage) => void;
    removeServer: (id: string) => void;
}

const ServerContext = createContext<ServersContextType | undefined>(undefined);

export const ServerProvider = ({ children }: { children: ReactNode }) => {
    const [servers, setServers] = useState<Storage[]>([]);

    const addServer = (server: Storage) => {
        setServers((prev) => [...prev, server]);
    };

    const removeServer = (id: string) => {
        setServers((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <ServerContext.Provider
            value={{
                servers,
                addServer,
                removeServer,
            }}
        >
            {children}
        </ServerContext.Provider>
    );
};

export const useServerContext = () => {
    const context = useContext(ServerContext);
    if (!context) {
        throw new Error(
            "useServerContext must be used within an ServerProvider"
        );
    }
    return context;
};
