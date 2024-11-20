import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

export const mainConfig: Configuration = {
    entry: "./src/process/index.ts",
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".svg"],
        alias: {
            "~": path.resolve(__dirname, "src/ui/"),
        },
    },
};
