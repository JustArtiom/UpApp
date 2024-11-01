import { ApiContext } from "./preload";

declare global {
    interface Window {
        api: ApiContext;
    }
}
