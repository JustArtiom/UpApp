import { ipcMain } from "electron";
import { database, ffmpeg, storage, window } from "../ipcServices";

export const registerIpcEvents = () => {
    ipcMain.on("window-minimize", window.minimize);
    ipcMain.on("window-toggle-minmax", window.toggleMinMax);
    ipcMain.on("window-close", window.close);

    ipcMain.handle("database-setpath", database.setdbPath);
    ipcMain.handle("database-initialize", database.initializeDatabase);
    ipcMain.handle("db-query", database.queryDatabase);
    ipcMain.handle("db-get-servers", database.getServers);
    ipcMain.handle("db-get-user", database.getUser);
    ipcMain.handle("db-save-user", database.saveUser);
    ipcMain.handle("db-save-storage", database.saveStorage);
    ipcMain.handle("db-dismiss-ffmpegw", database.setDismissFfmpegWarning);

    ipcMain.handle("storage-client-create", storage.createClient);
    ipcMain.handle("storage-ping", storage.ping);
    ipcMain.handle("storage-fetch-buckets", storage.fetchBuckets);
    ipcMain.handle("storage-create-bucket", storage.createBucket);
    ipcMain.handle("storage-fetch-bucket-files", storage.fetchBucketFiles);
    ipcMain.handle("storage-bucket-policy-update", storage.updateBucketPolicy);
    ipcMain.handle("storage-file-upload", storage.uploadFile);
    ipcMain.handle("storage-file-delete", storage.deleteFile);

    ipcMain.handle("ffmpeg-is-installed", ffmpeg.isInstalled);
};
