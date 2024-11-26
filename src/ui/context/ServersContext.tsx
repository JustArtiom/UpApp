import React, { createContext, useContext, useState, ReactNode } from "react";
import { S3 } from "~/utils/s3";

interface ServersContextType {
    servers: S3[];
    addServer: (server: S3) => void;
    removeServer: (id: string) => void;
}

const ServerContext = createContext<ServersContextType | undefined>(undefined);

export const ServerProvider = ({ children }: { children: ReactNode }) => {
    const [servers, setServers] = useState<S3[]>([]);

    const addServer = (server: S3) => {
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
