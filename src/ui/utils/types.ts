export interface DBSettings {
    id?: number;
    name?: string;
    light_mode?: number;

    copy_url_after_upload?: number;
    ask_before_upload?: number;
    ffmpeg_warning?: number;
    ffmpeg_hardware_acceleration?: number;

    video_compression?: number;
    video_thubnail?: number;
    video_thubnail_resolution?: number;
    video_thubnail_position?: number;
    video_thubnail_format?: string;
    video_quality_level?: number;
    video_resolution?: number;
    video_bitrate?: number;
    video_framerate?: number;
    video_codec?: string;
    video_encoding_speed?: string;

    video_bitrate_mode?: string;
    video_keyframe_interval?: number;

    audio_compression?: number;
    audio_bitrate?: number;
    audio_channels?: number;
    audio_codec?: string;
    audio_sample_rate?: string;

    image_compression?: number;
    image_quality?: number;

    version?: string;
}

export interface DBServer {
    id: number;
    ip: string;
    port: number;
    ssl: number;
    username: string;
    password: string;
    default_selected: number;
    alias?: string;
}
