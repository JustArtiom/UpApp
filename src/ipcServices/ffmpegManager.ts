import { execSync } from "child_process";

export const ffmpeg = {
    isInstalled: () => {
        try {
            execSync("ffmpeg -version", { stdio: "ignore" });
            return true;
        } catch (error) {
            return false;
        }
    },
};
