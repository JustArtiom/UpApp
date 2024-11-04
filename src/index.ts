import { app, BrowserWindow } from "electron";
import { registerIpcEvents } from "./utils/ipcRegister";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const gotTheLock = app.requestSingleInstanceLock();
export let mainWindow: BrowserWindow = undefined;

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (/* event, commandLine, workingDirectory */) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    const createMainWindow = () => {
        mainWindow = new BrowserWindow({
            title: "UpApp",
            titleBarStyle: "hiddenInset",
            frame: false,
            height: 900,
            width: 1100,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                webSecurity: false,
                nodeIntegration: false,
            },
        });

        registerIpcEvents();
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        return mainWindow;
    };

    app.on("ready", () => {
        createMainWindow();
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
}
export { BrowserWindow };
