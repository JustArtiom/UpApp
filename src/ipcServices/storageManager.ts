import * as Minio from "minio";

const clients: Map<string, Minio.Client> = new Map();

export const storage = {
    createClient: (
        _event: Electron.IpcMainEvent,
        ip: string,
        port: number,
        ssl: boolean,
        access: string,
        secret: string
    ) => {
        const id = ip + ":" + port;
        clients.set(
            id,
            new Minio.Client({
                endPoint: ip,
                port: port,
                useSSL: ssl,
                accessKey: access,
                secretKey: secret,
            })
        );

        return id;
    },

    ping: async (_event: Electron.IpcMainEvent, id: string) => {
        try {
            await clients.get(id).listBuckets();
            return true;
        } catch (err) {
            return err;
        }
    },
};
