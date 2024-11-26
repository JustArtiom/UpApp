import { useEffect, useRef } from "react";
import Form from "~/components/Form";
import { useModalContext } from "~/context/ModalContext";

const ModalDisplay = () => {
    const { modal } = useModalContext();
    const refForm = useRef<HTMLFormElement>();

    const cancelModal = () =>
        refForm.current.dispatchEvent(
            new Event("submit", {
                bubbles: true,
                cancelable: true,
            })
        );

    useEffect(() => {
        if (!modal) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && refForm.current) {
                cancelModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [modal]);

    return (
        modal && (
            <div
                className="bg-[rgba(0,0,0,0.5)] absolute w-full h-full flex items-center justify-center z-40"
                onClick={() => {
                    cancelModal();
                }}
            >
                <div
                    className="w-full max-w-[500px] m-5 p-3 rounded-xl bg-primary"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="p-3 overflow-y-auto max-h-[80vh]">
                        <Form ref={refForm} {...modal} />
                    </div>
                </div>
            </div>
        )
    );
};

export default ModalDisplay;
