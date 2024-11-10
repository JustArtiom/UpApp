import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
    new ForkTsCheckerWebpackPlugin({
        logger: "webpack-infrastructure",
    }),
    new HtmlWebpackPlugin({
        cspPlugin: {
            enabled: true,
            hashEnabled: {
                "script-src": true,
                "style-src": false,
            },
            nonceEnabled: {
                "script-src": true,
                "style-src": false,
            },
            policy: {
                "base-uri": "'self'",
                "default-src": "'self'",
                "frame-src": "'none'",
                "img-src": ["'self'", "data:"],
                "media-src": "'none'",
                "object-src": "'none'",
                "script-src": ["'self'"],
                "style-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            },
        },
    }),
];
