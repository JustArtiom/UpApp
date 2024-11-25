export class S3 {
    constructor(
        ip: string,
        port: number,
        access: string,
        secret: string,
        ssl?: boolean,
        alias?: string
    ) {
        this.ip = ip;
        this.port = port;
        this.access = access;
        this.secret = secret;
        this.ssl = !!ssl;
        this.alias = alias;
        this.alias_domain = alias
            ?.replace("https://", "")
            .replace("http://", "")
            .replace("/", "");
        this.fullUrl = `http${ssl ? "s" : ""}://${ip}:${port}`;
    }

    id?: string;
    ip!: string;
    port!: number;
    access!: string;
    secret!: string;
    ssl!: boolean;
    alias?: string;
    alias_domain?: string;
    fullUrl: string;
    static defaultBucket = "cdn";

    async createClient() {
        this.id = await window.api.storage.createClient(
            this.ip,
            this.port,
            this.ssl,
            this.access,
            this.secret
        );
        return this;
    }

    async ping(): Promise<boolean> {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");
        const res = await window.api.storage.ping(this.id);
        if (res === true) return true;
        throw res;
    }

    async saveInDatabase() {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");
        return await window.api.db.saveStorage(
            this.ip,
            this.port,
            this.ssl,
            this.access,
            this.secret,
            this.alias
        );
    }

    async createBucket(name: string) {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const res = await window.api.storage
            .createBucket(this.id, name)
            .catch((err) => err);

        if (res instanceof Error) throw res;
        return res;
    }

    async makeBucketPublic(name: string, path: string) {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const bucketPolicy = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Principal: "*",
                    Action: ["s3:GetObject"],
                    Resource: [`arn:aws:s3:::${name}${path}*`],
                },
            ],
        };

        const res = await window.api.storage.updateBucketPolicy(
            this.id,
            name,
            JSON.stringify(bucketPolicy)
        );

        if (res instanceof Error) throw res;
        return res;
    }

    async fetchBuckets() {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const res = await window.api.storage
            .fetchBuckets(this.id)
            .catch((err) => err);

        if (res instanceof Error) throw res;
        return res;
    }

    async fetchBucketFiles(bucket: string) {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const res = await window.api.storage
            .fetchBucketFiles(this.id, bucket)
            .catch((err) => err);

        if (res instanceof Error) throw res;
        return res;
    }

    async uploadFile(
        bucket: string,
        name: string,
        data: any,
        size?: number,
        contentType?: string
    ) {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const res = await window.api.storage.uploadFile(
            this.id,
            bucket,
            name,
            data,
            size,
            contentType
        );

        if (res instanceof Error) throw res;
        return res;
    }

    async fileDelete(bucket: string, fname: string) {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");

        const res = await window.api.storage.deleteFile(this.id, bucket, fname);

        if (res instanceof Error) throw res;
        return res;
    }
}
