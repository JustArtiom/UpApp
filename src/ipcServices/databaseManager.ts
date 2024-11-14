import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

let db: Database.Database;
const sqltables = `
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255),

    -- General Settings
    copy_url_after_upload BOOLEAN,
    ask_before_upload BOOLEAN,
    ffmpeg_warning BOOLEAN,
    ffmpeg_hardware_acceleration BOOLEAN,

    -- Video Settings
    video_compression BOOLEAN,
    video_thumbnail BOOLEAN,
    video_thumbnail_resolution INT,           -- Example: 240 for 240p, 480 for 480p
    video_thumbnail_position INT,             -- Frame capture position in seconds
    video_thumbnail_format VARCHAR(8),        -- e.g., 'jpeg', 'png'
    video_quality_level INT,                  -- Compression level (0-51 in FFmpeg, lower is better)
    video_resolution VARCHAR(16),             -- e.g., '1920x1080'
    video_bitrate INT,                        -- e.g., 800000 (in bits per second)
    video_framerate INT,                      -- Frames per second
    video_codec VARCHAR(255),                 -- e.g., 'h264', 'vp9', 'hevc'
    video_encoding_speed VARCHAR(16),         -- e.g., 'ultrafast', 'medium', 'slow'

    -- Advanced Video Settings
    video_bitrate_mode VARCHAR(16),           -- e.g., 'CBR' (Constant Bit Rate) or 'VBR' (Variable Bit Rate)
    video_keyframe_interval INT,              -- Keyframe distance in frames

    -- Audio Settings
    audio_compression BOOLEAN,
    audio_bitrate INT,                        -- e.g., 128000 (in bits per second)
    audio_channels INT,                       -- Mono (1), Stereo (2)
    audio_codec VARCHAR(255),                 -- e.g., 'aac', 'mp3', 'opus'
    audio_sample_rate INT,                    -- e.g., 44100, 48000

    -- Image Settings
    image_compression BOOLEAN,
    image_quality INT                         -- e.g., 85 for JPEG quality scale (0-100)
);


CREATE TABLE IF NOT EXISTS storages (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    ip VARCHAR(255) NOT NULL,
    port INTEGER NOT NULL,
    ssl BOOLEAN NOT NULL,
    public TEXT NOT NULL,
    secret TEXT NOT NULL,
    default_selected BOOLEAN,
    alias VARCHAR(255),
    UNIQUE(ip, port)
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
        secret: string,
        alias?: string
    ) => {
        return await database
            .queryDatabase<"run">(
                undefined,
                `INSERT INTO storages (ip, port, ssl, public, secret, alias) 
            VALUES (?, ?, ?, ?, ?, ?) 
            ON CONFLICT(ip, port) 
            DO UPDATE SET ssl = EXCLUDED.ssl, public = EXCLUDED.public, secret = EXCLUDED.secret, alias = EXCLUDED.alias`,
                [ip, port, ssl ? 1 : 0, access, secret, alias || null]
            )
            .catch((err) => err);
    },

    setDismissFfmpegWarning: async (_event: Electron.IpcMainEvent) => {
        return await database
            .queryDatabase<"run">(
                undefined,
                "UPDATE user SET dismiss_ffmpeg_warning = 1"
            )
            .catch((err) => err);
    },
};
