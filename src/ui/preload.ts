import { contextBridge, IpcRenderer, ipcRenderer } from "electron";
import throwIfError from "./utils/throwIfError";
import { DBServer, DBSettings } from "./utils/types";

interface CustomIpcRenderer extends IpcRenderer {
    invoke<T>(channel: string, ...args: any[]): Promise<T>;
}

const { invoke, send } = ipcRenderer as CustomIpcRenderer;

const api = {
    window: {
        minimize: () => send("win-minimize"),
        toggleMinMax: () => send("win-toggle-minmax"),
        close: () => send("win-close"),
    },

    db: {
        setup: () => invoke("db-setup").then(throwIfError),
        getSettings: () =>
            invoke<DBSettings | null>("db-get-settings").then(throwIfError),
        getServers: () =>
            invoke<DBServer[]>("db-get-servers").then(throwIfError),
        patchSettings: (settings: DBSettings) =>
            invoke("db-patch-settings", settings),
        setLightMode: (l: boolean) => invoke("db-set-light-mode", l),
    },

    version: ipcRenderer.sendSync("app-version"),
};

export type ApiContext = typeof api;

console.log("Linking the api context bridge to the window object");
contextBridge.exposeInMainWorld("api", api);
