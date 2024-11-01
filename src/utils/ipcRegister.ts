import { ipcMain } from "electron";
import { window } from "../ipcEvents";

export const registerIpcEvents = () => {
    ipcMain.on("window-minimize", window.minimize);
    ipcMain.on("window-toggle-minmax", window.toggleMinMax);
    ipcMain.on("window-close", window.close);
};
