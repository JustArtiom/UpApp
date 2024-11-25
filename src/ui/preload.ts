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
        saveStorage: async (
            ip: string,
            port: number,
            ssl: boolean,
            access: string,
            secret: string,
            alias?: string
        ) => {
            return await ipcRenderer
                .invoke("db-post-server", ip, port, ssl, access, secret, alias)
                .then(throwIfError);
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
                "st-client-create",
                ip,
                port,
                ssl,
                access,
                secret
            );
        },

        ping: (id: string) =>
            ipcRenderer.invoke("st-ping", id).then(throwIfError),

        fetchBuckets: (id: string) => {
            return ipcRenderer.invoke("st-fetch-buckets", id);
        },

        createBucket: (id: string, name: string) => {
            return ipcRenderer.invoke("st-create-bucket", id, name);
        },

        updateBucketPolicy: (id: string, name: string, policy: any) => {
            return ipcRenderer.invoke(
                "st-bucket-policy-update",
                id,
                name,
                policy
            );
        },

        fetchBucketFiles: (id: string, bucket: string) => {
            return ipcRenderer.invoke("st-fetch-bucket-files", id, bucket);
        },

        uploadFile: (
            id: string,
            bucket: string,
            file_name: string,
            data: any,
            size?: number,
            contentType?: string
        ) => {
            return ipcRenderer.invoke(
                "st-file-upload",
                id,
                bucket,
                file_name,
                data,
                size,
                contentType
            );
        },

        deleteFile: (id: string, bucket: string, file_name: string) =>
            ipcRenderer.invoke("st-file-delete", id, bucket, file_name),
    },

    version: ipcRenderer.sendSync("app-version"),
};

export type ApiContext = typeof api;

console.log("Linking the api context bridge to the window object");
contextBridge.exposeInMainWorld("api", api);
