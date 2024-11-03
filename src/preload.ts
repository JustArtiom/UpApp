import { contextBridge, ipcRenderer } from "electron";

const api = {
    window: {
        minimize: () => ipcRenderer.send("window-minimize"),
        toggleMinMax: () => ipcRenderer.send("window-toggle-minmax"),
        close: () => ipcRenderer.send("window-close"),
    },

    db: {
        setdbPath: (dbPath: string) =>
            ipcRenderer.invoke("database-setpath", dbPath),
        initialize: () => ipcRenderer.invoke("database-initialize"),
        query: (
            query: string,
            values: Array<string | number | null | Buffer>
        ) => ipcRenderer.invoke("db-query", query, values),
        getServers: () => ipcRenderer.invoke("db-get-servers"),
        getUser: () => ipcRenderer.invoke("db-get-user"),
        saveUser: (username: string) =>
            ipcRenderer.invoke("db-save-user", username),
        saveStorage: (
            ip: string,
            port: number,
            ssl: boolean,
            access: string,
            secret: string
        ) => {
            return ipcRenderer.invoke(
                "db-save-storage",
                ip,
                port,
                ssl,
                access,
                secret
            );
        },
    },

    storage: {
        createClient: (
            ip: string,
            port: number,
            ssl: boolean,
            access: string,
            secret: string
        ) => {
            return ipcRenderer.invoke(
                "storage-client-create",
                ip,
                port,
                ssl,
                access,
                secret
            );
        },

        ping: (id: string) => {
            return ipcRenderer.invoke("storage-ping", id);
        },
    },
};

export type ApiContext = typeof api;

contextBridge.exposeInMainWorld("api", api);
