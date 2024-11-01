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
    },
};

export type ApiContext = typeof api;

contextBridge.exposeInMainWorld("api", api);
