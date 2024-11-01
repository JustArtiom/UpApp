import { BrowserWindow } from "electron";
import { mainWindow } from "..";

export const window = {
    minimize: () => {
        if (!mainWindow) return;
        mainWindow.minimize();
    },

    toggleMinMax: () => {
        if (!mainWindow) return;
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    },

    close: () => {
        if (!mainWindow) return;
        mainWindow.close();
    },
};
