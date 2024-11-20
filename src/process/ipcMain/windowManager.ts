import { mainWindow } from "..";

export const windowManager = {
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
