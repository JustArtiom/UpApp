import React, { createContext, useContext, useState, ReactNode } from "react";

interface Error {
    id: number;
    message: string;
}

interface ErrorContextType {
    errors: Error[];
    addError: (message: string) => void;
    removeError: (id: number) => void;
    clearErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);
let id = 0;

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errors, setErrors] = useState<Error[]>([]);

    const addError = (message: string) => {
        const idis = id++;
        setErrors((prevErrors) => [...prevErrors, { id: idis, message }]);
        setTimeout(() => {
            removeError(idis);
        }, 5000);
    };

    const removeError = (idis: number) => {
        setErrors((prevErrors) =>
            prevErrors.filter((error) => error.id !== idis)
        );
    };

    const clearErrors = () => {
        setErrors([]);
    };

    return (
        <ErrorContext.Provider
            value={{ errors, addError, removeError, clearErrors }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
};
