import React from "react";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    return (
        <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            className="absolute inset-0 flex justify-center items-center z-50"
        >
            <div className="max-w-[400px] w-full m-5 p-5 bg-[var(--bg-primary)] rounded-xl border-[var(--stroke-primary)] border-[1px]">
                {children}
            </div>
        </div>
    );
};

export default Modal;
