import { contextBridge, ipcRenderer } from "electron";

const api = {
    window: {
        minimize: () => ipcRenderer.send("window-minimize"),
        toggleMinMax: () => ipcRenderer.send("window-toggle-minmax"),
        close: () => ipcRenderer.send("window-close"),
    },
};

export type ApiContext = typeof api;

contextBridge.exposeInMainWorld("api", api);
