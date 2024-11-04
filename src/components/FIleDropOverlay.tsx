import React from "react";

interface FileDropOverlayProps {
    isVisible: boolean;
    onFileDrop: (file: File) => void;
    onDragLeave: () => void;
}

const FileDropOverlay: React.FC<FileDropOverlayProps> = ({
    isVisible,
    onFileDrop,
    onDragLeave,
}) => {
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            onFileDrop(file);
        }
    };

    return isVisible ? (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                fontSize: "24px",
            }}
            onDragOver={handleDragOver}
            onDragLeave={onDragLeave}
            onDrop={handleDrop}
        >
            Drop your file here to upload
        </div>
    ) : null;
};

export default FileDropOverlay;
