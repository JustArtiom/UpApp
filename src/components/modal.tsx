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
            {children}
        </div>
    );
};

export default Modal;
