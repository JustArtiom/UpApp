import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";
const CopyWebpackPlugin = require("copy-webpack-plugin");

plugins.push(
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(
                    __dirname,
                    "node_modules/sqlite-electron/sqlite-win32-x64"
                ),
                to: path.resolve(__dirname, ".webpack/sqlite-win32-x64"),
            },
        ],
    })
);

export const mainConfig: Configuration = {
    entry: "./src/index.ts",
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".svg"],
        alias: {
            "~": path.resolve(__dirname, "src/"),
        },
    },
};
