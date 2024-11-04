import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

let db: Database.Database;
const sqltables = `
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS storages (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    ip VARCHAR(255) NOT NULL,
    port INTEGER NOT NULL,
    ssl BOOLEAN NOT NULL,
    public TEXT NOT NULL,
    secret TEXT NOT NULL,
    UNIQUE(ip, port)
);

CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    size INTEGER NOT NULL,
    path TEXT NOT NULL,
    name TEXT NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    server_id INTEGER,
    saved BOOLEAN NOT NULL,
    FOREIGN KEY (server_id) REFERENCES storages(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS labels (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    colour CHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS labeled_videos (
    video_id INTEGER NOT NULL,
    label_id INTEGER NOT NULL,
    PRIMARY KEY (video_id, label_id),
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE CASCADE
);
`;

export const database = {
    setdbPath: async (_event: Electron.IpcMainEvent, dbPath: string) => {
        const fullPath = path.join(app.getPath("userData"), "./database.db");
        db = new Database(fullPath);
    },

    initializeDatabase: async (_event: Electron.IpcMainEvent) => {
        return db.exec(sqltables);
    },

    queryDatabase: async <T extends "select" | "run" = "select", Y = any>(
        _event: Electron.IpcMainEvent,
        query: string,
        params: any[] = []
    ): Promise<T extends "select" ? Y[] : Database.RunResult> => {
        const stmt = db.prepare(query);

        if (query.trim().toUpperCase().startsWith("SELECT")) {
            return stmt.all(params) as any;
        } else {
            return stmt.run(params) as any;
        }
    },

    getServers: async (_event: Electron.IpcMainEvent) => {
        return await database
            .queryDatabase(undefined, "SELECT * FROM storages")
            .catch((err) => err);
    },

    getUser: async () => {
        const users = await database.queryDatabase(
            undefined,
            "SELECT * FROM user"
        );
        if (users.length) return users[0];
        return null;
    },

    saveUser: async (_event: Electron.IpcMainEvent, username: string) => {
        return await database
            .queryDatabase<"run">(
                undefined,
                "INSERT INTO user (name) values(?)",
                [username]
            )
            .catch((err) => err);
    },

    saveStorage: async (
        _event: Electron.IpcMainEvent,
        ip: string,
        port: number,
        ssl: boolean,
        access: string,
        secret: string
    ) => {
        return await database
            .queryDatabase<"run">(
                undefined,
                "INSERT INTO storages (ip, port, ssl, public, secret) VALUES (?,?,?,?,?) ON CONFLICT(ip, port) DO UPDATE SET ssl = EXCLUDED.ssl, public = EXCLUDED.public, secret = EXCLUDED.secret;",
                [ip, port, ssl ? 1 : 0, access, secret]
            )
            .catch((err) => err);
    },
};
