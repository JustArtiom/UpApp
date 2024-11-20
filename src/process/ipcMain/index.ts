import { app, ipcMain } from "electron";
import { windowManager } from "./windowManager";
import { databaseManager } from "./databaseManager";

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
};
