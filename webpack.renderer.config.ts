import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

rules.push({
    test: /\.css$/,
    use: ["style-loader", "css-loader", "postcss-loader"],
});

rules.push({
    test: /\.svg$/,
    use: [{ loader: "@svgr/webpack" }, "url-loader"],
});

rules.push({
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
});

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".svg"],
        alias: {
            "~": path.resolve(__dirname, "src/"),
        },
        fallback: {
            path: require.resolve("path-browserify"),
            child_process: false,
        },
    },
};
