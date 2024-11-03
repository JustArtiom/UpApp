export class Storage {
    constructor(
        ip: string,
        port: number,
        access: string,
        secret: string,
        ssl?: boolean
    ) {
        this.ip = ip;
        this.port = port;
        this.access = access;
        this.secret = secret;
        this.ssl = !!ssl;
    }

    id?: string;
    ip!: string;
    port!: number;
    access!: string;
    secret!: string;
    ssl!: boolean;

    async createClient() {
        this.id = await window.api.storage.createClient(
            this.ip,
            this.port,
            this.ssl,
            this.access,
            this.secret
        );
    }

    async ping(): Promise<boolean> {
        if (!this.id)
            throw new Error("Ping the storage without initializing the client");
        const res = await window.api.storage.ping(this.id);
        if (res === true) return true;
        throw res;
    }
}
