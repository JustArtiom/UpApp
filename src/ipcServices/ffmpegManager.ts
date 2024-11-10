import { execSync } from "child_process";
import { exec } from "child_process";
import { app } from "electron";
import fs from "fs";
import path from "path";

export const ffmpeg = {
    isInstalled: () => {
        try {
            execSync("ffmpeg -version", { stdio: "ignore" });
            return true;
        } catch (error) {
            return false;
        }
    },

    createThumbnail: (
        _event: Electron.IpcMainEvent,
        file_name: string,
        data: Buffer | string
    ) => {
        if (!ffmpeg.isInstalled()) {
            console.warn("ffmpeg is not installed");
            return null;
        }

        const tempdir = app.getPath("temp");
        const inputFilePath = path.join(tempdir, file_name);
        const thumbnailFileName = `.thub_${file_name}.jpg`;
        const thumbnailPath = path.join(tempdir, thumbnailFileName);

        console.log(inputFilePath);

        fs.writeFileSync(inputFilePath, data);

        try {
            execSync(
                `ffmpeg -i "${inputFilePath}" -ss 00:00:01.000 -vframes 1 -q:v 3 -vf "scale=480:-1" "${thumbnailPath}" -y`
            );
            return {
                thumbnailPath,
                thumbnailStream: fs.createReadStream(thumbnailPath),
                deleteThubnail: () => fs.unlinkSync(thumbnailPath),
                thumbnailFileName,
            };
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            fs.unlinkSync(inputFilePath);
        }
    },
};
