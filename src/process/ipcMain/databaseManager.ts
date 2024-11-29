import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";
import catchAndReturn from "../utils/catchAndReturn";

let db: Database.Database;
const sqltables = `
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(255),
    light_mode BOOLEAN DEFAULT 0,
    file_list_type INT DEFAULT 0,

    -- General Settings
    copy_url_after_upload BOOLEAN DEFAULT 1,
    ask_before_upload BOOLEAN DEFAULT 0,
    ffmpeg_warning BOOLEAN DEFAULT 1,
    ffmpeg_hardware_acceleration BOOLEAN DEFAULT 1,

    -- Video Settings
    video_compression BOOLEAN DEFAULT 0,
    video_thumbnail BOOLEAN DEFAULT 1,
    video_thumbnail_resolution INT,           -- Example: 240 for 240p, 480 for 480p
    video_thumbnail_position INT,             -- Frame capture position in seconds
    video_thumbnail_format VARCHAR(8),        -- e.g., 'jpeg', 'png'
    video_quality_level INT,                  -- Compression level (0-51 in FFmpeg, lower is better)
    video_resolution INT,                     -- e.g., '1920x1080'
    video_bitrate INT,                        -- e.g., 800000 (in bits per second)
    video_framerate INT,                      -- Frames per second
    video_codec VARCHAR(255),                 -- e.g., 'h264', 'vp9', 'hevc'
    video_encoding_speed VARCHAR(16),         -- e.g., 'ultrafast', 'medium', 'slow'

    -- Advanced Video Settings
    video_bitrate_mode VARCHAR(16),           -- e.g., 'CBR' (Constant Bit Rate) or 'VBR' (Variable Bit Rate)
    video_keyframe_interval INT,              -- Keyframe distance in frames

    -- Audio Settings
    audio_compression BOOLEAN DEFAULT 0,
    audio_bitrate INT,                        -- e.g., 128000 (in bits per second)
    audio_channels INT,                       -- Mono (1), Stereo (2)
    audio_codec VARCHAR(255),                 -- e.g., 'aac', 'mp3', 'opus'
    audio_sample_rate INT,                    -- e.g., 44100, 48000

    -- Image Settings
    image_compression BOOLEAN DEFAULT 0,
    image_quality INT,                        -- e.g., 85 for JPEG quality scale (0-100)

    -- Versioning
    version VARCHAR(16) NOT NULL              -- e.g., 1.0.0
);


CREATE TABLE IF NOT EXISTS server (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    ip VARCHAR(255) NOT NULL,
    port INTEGER NOT NULL,
    ssl BOOLEAN NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    default_selected BOOLEAN DEFAULT 0,
    alias VARCHAR(255) UNIQUE,
    UNIQUE(ip, port)
);
`;

const q = async (query: string, params: any[] = []) => {
    if (!db) throw new Error("Database not initialized");
    const stmt = db.prepare(query);

    if (query.trim().toUpperCase().startsWith("SELECT")) {
        return stmt.all(params) as any;
    } else {
        return stmt.run(params) as any;
    }
};

export const databaseManager = {
    setup: catchAndReturn(async (_event: Electron.IpcMainEvent) => {
        const fullPath = path.join(app.getPath("userData"), "./database.db");
        db = new Database(fullPath);
        db.exec(sqltables);
        const settings = await databaseManager.getSettings();
        if (!settings || !settings.version)
            q(`INSERT INTO settings (version) values (?)`, [app.getVersion()]);
    }),

    getSettings: catchAndReturn(async () => {
        const settings = await q(`SELECT * FROM settings`);
        if (!settings || !settings.length) return null;
        else return settings[0];
    }),

    patchSettings: catchAndReturn(
        async (_, settings: Partial<Record<string, any>>) => {
            if (!settings || Object.keys(settings).length === 0) {
                throw new Error("No settings provided for update.");
            }

            const columns = Object.keys(settings)
                .map((key) => `${key} = ?`)
                .join(", ");
            const values = Object.values(settings);

            const query = `UPDATE settings SET ${columns} WHERE id = 1`;

            return q(query, values);
        }
    ),

    getServers: catchAndReturn(() => {
        return q(`SELECT * FROM server`);
    }),

    saveServer: catchAndReturn(
        (
            _event: Electron.IpcMainEvent,
            ip: string,
            port: number,
            ssl: boolean,
            access: string,
            secret: string,
            alias?: string
        ) => {
            return q(
                `INSERT INTO server (ip, port, ssl, username, password, alias) 
                VALUES (?, ?, ?, ?, ?, ?) 
                ON CONFLICT(ip, port) 
                DO UPDATE SET 
                    ssl = EXCLUDED.ssl, 
                    username = EXCLUDED.username, 
                    password = EXCLUDED.password, 
                    alias = EXCLUDED.alias`,
                [ip, port, ssl ? 1 : 0, access, secret, alias || null]
            );
        }
    ),
};
