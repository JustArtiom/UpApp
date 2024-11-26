import { createContext, useContext, useEffect, useState } from "react";
import { FormProps } from "~/components/Form";

interface ModalContextType {
    modal: FormProps | undefined;
    setModal: React.Dispatch<React.SetStateAction<FormProps | undefined>>;
    createModal: (modalProps: FormProps) => Promise<{
        modalData: FormData;
        modalSubmitter?: HTMLButtonElement;
    }>;
    cancelModal: () => void;
}

const ModalContext = createContext<ModalContextType>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<FormProps | undefined>(undefined);

    const createModal = (modalProps: FormProps) =>
        new Promise<{
            modalData: FormData;
            modalSubmitter?: HTMLButtonElement;
        }>((res) => {
            console.log("Modal created");

            setModal({
                onSubmit: (e) => {
                    e.preventDefault();
                    console.log("Modal submitted");

                    const modalData = new FormData(e.currentTarget);
                    const modalSubmitter = (e.nativeEvent as SubmitEvent)
                        ?.submitter as HTMLButtonElement;

                    cancelModal();
                    res({ modalData, modalSubmitter });
                },
                ...modalProps,
            });
        });

    const cancelModal = () => {
        setModal(undefined);
    };

    return (
        <ModalContext.Provider
            value={{ modal, setModal, createModal, cancelModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }

    return context;
};
