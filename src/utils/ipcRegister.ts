import { ipcMain } from "electron";
import { database, storage, window } from "../ipcServices";

export const registerIpcEvents = () => {
    ipcMain.on("window-minimize", window.minimize);
    ipcMain.on("window-toggle-minmax", window.toggleMinMax);
    ipcMain.on("window-close", window.close);

    ipcMain.handle("database-setpath", database.setdbPath);
    ipcMain.handle("database-initialize", database.initializeDatabase);
    ipcMain.handle("db-query", database.execQuery);
    ipcMain.handle("db-get-servers", database.getServers);
    ipcMain.handle("db-get-user", database.getUser);
    ipcMain.handle("db-save-user", database.saveUser);
    ipcMain.handle("db-save-storage", database.saveStorage);

    ipcMain.handle("storage-client-create", storage.createClient);
    ipcMain.handle("storage-ping", storage.ping);
};
