import { contextBridge, ipcRenderer } from "electron";
import { throwOrReturn } from "./utils";

const api = {
    window: {
        minimize: () => ipcRenderer.send("window-minimize"),
        toggleMinMax: () => ipcRenderer.send("window-toggle-minmax"),
        close: () => ipcRenderer.send("window-close"),
    },

    db: {
        setdbPath: (dbPath: string) =>
            ipcRenderer.invoke("database-setpath", dbPath).then(throwOrReturn),
        initialize: () =>
            ipcRenderer.invoke("database-initialize").then(throwOrReturn),
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
            secret: string,
            alias?: string
        ) => {
            return ipcRenderer.invoke(
                "db-save-storage",
                ip,
                port,
                ssl,
                access,
                secret,
                alias
            );
        },

        setDismissFfmpegWarning: () => {
            return ipcRenderer.invoke("db-dismiss-ffmpegw");
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

        fetchBuckets: (id: string) => {
            return ipcRenderer.invoke("storage-fetch-buckets", id);
        },

        createBucket: (id: string, name: string) => {
            return ipcRenderer.invoke("storage-create-bucket", id, name);
        },

        updateBucketPolicy: (id: string, name: string, policy: any) => {
            return ipcRenderer.invoke(
                "storage-bucket-policy-update",
                id,
                name,
                policy
            );
        },

        fetchBucketFiles: (id: string, bucket: string) => {
            return ipcRenderer.invoke("storage-fetch-bucket-files", id, bucket);
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
                "storage-file-upload",
                id,
                bucket,
                file_name,
                data,
                size,
                contentType
            );
        },
    },

    ffmpeg: {
        isInstalled: () => ipcRenderer.invoke("ffmpeg-is-installed"),
    },
};

export type ApiContext = typeof api;

contextBridge.exposeInMainWorld("api", api);
