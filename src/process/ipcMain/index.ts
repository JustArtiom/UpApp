import { app, ipcMain } from "electron";
import { windowManager } from "./windowManager";
import { databaseManager } from "./databaseManager";
import { storageManager } from "./storageManager";

export const registerIPCEvents = () => {
    ipcMain.on(
        "app-version",
        (event) => (event.returnValue = app.getVersion())
    );

    ipcMain.on("win-minimize", windowManager.minimize);
    ipcMain.on("win-toggle-minmax", windowManager.toggleMinMax);
    ipcMain.on("win-close", windowManager.close);

    ipcMain.handle("db-setup", databaseManager.setup);
    ipcMain.handle("db-get-settings", databaseManager.getSettings);
    ipcMain.handle("db-patch-settings", databaseManager.patchSettings);
    ipcMain.handle("db-get-servers", databaseManager.getServers);
    ipcMain.handle("db-post-server", databaseManager.saveServer);

    ipcMain.handle("st-client-create", storageManager.createClient);
    ipcMain.handle("st-ping", storageManager.ping);
    ipcMain.handle("st-fetch-buckets", storageManager.fetchBuckets);
    ipcMain.handle("st-create-bucket", storageManager.createBucket);
    ipcMain.handle("st-fetch-bucket-files", storageManager.fetchBucketFiles);
    ipcMain.handle("st-patch-bucket-policy", storageManager.updateBucketPolicy);
    ipcMain.handle("st-upload-file", storageManager.uploadFile);
    ipcMain.handle("st-delete-file", storageManager.deleteFile);
};
