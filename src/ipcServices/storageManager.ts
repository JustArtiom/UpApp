import * as Minio from "minio";
import { BucketItem } from "minio";

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

    fetchBuckets: async (_event: Electron.IpcMainEvent, id: string) => {
        try {
            return await clients.get(id).listBuckets();
        } catch (err) {
            return err;
        }
    },

    createBucket: async (
        _event: Electron.IpcMainEvent,
        id: string,
        name: string
    ) => {
        try {
            return await clients.get(id).makeBucket(name);
        } catch (err) {
            return err;
        }
    },

    updateBucketPolicy: async (
        _event: Electron.IpcMainEvent,
        id: string,
        name: string,
        policy: any
    ) => {
        try {
            return await clients.get(id).setBucketPolicy(name, policy);
        } catch (err) {
            return err;
        }
    },

    fetchBucketFiles: async (
        _event: Electron.IpcMainEvent,
        id: string,
        bucket: string
    ) => {
        const objectsList: BucketItem[] = [];
        return await new Promise<BucketItem[] | Error>((resolve, reject) => {
            const stream = clients.get(id).listObjectsV2(bucket, "", true);

            stream.on("data", (obj) => {
                objectsList.push(obj);
            });

            stream.on("end", () => {
                resolve(objectsList);
            });

            stream.on("error", (error) => {
                resolve(error);
            });
        });
    },

    uploadFile: async (
        _event: Electron.IpcMainEvent,
        id: string,
        bucket: string,
        file_name: string,
        data: any,
        size?: number,
        contentType?: string
    ) => {
        return new Promise<Error | any>(async (resolve) => {
            const client = clients.get(id);

            if (typeof data !== "string")
                data = Buffer.from(new Uint8Array(data));

            try {
                await client.putObject(
                    bucket,
                    file_name,
                    data,
                    size,
                    contentType
                        ? {
                              "Content-Type": contentType,
                          }
                        : undefined
                );
                resolve(true);
            } catch (err) {
                resolve(err);
            }
        });
    },
};
