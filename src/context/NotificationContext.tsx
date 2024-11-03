import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from "react";

export interface MyNotification {
    id: number;
    type: "error" | "warning" | "success";
    message: string;
}

interface NotificationContextType {
    notifications: MyNotification[];
    sendNotification: (message: string, type: MyNotification["type"]) => void;
    removeNotification: (id: number) => void;
    clearNotifications: () => void;
    stopTimeout: (id: number) => void;
    startTimeout: (id: number, time?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);
let id = 0;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<MyNotification[]>([]);
    const timeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

    const startTimeout = (idis: number, time: number = 5000) => {
        const timeout = setTimeout(() => {
            removeNotification(idis);
        }, time);
        timeouts.current.set(idis, timeout);
    };

    const stopTimeout = (idis: number) => {
        const timeout = timeouts.current.get(idis);
        if (timeout) {
            clearTimeout(timeout);
            timeouts.current.delete(idis);
        }
    };

    const sendNotification = (
        message: string,
        type: MyNotification["type"]
    ) => {
        const idis = id++;
        setNotifications((prevErrors) => [
            ...prevErrors,
            { id: idis, type, message },
        ]);
        startTimeout(idis);
    };

    const removeNotification = (idis: number) => {
        setNotifications((prevErrors) =>
            prevErrors.filter((error) => error.id !== idis)
        );
    };

    const clearNotifications = () => {
        setNotifications([]);
        timeouts.current.forEach((timeout) => clearTimeout(timeout));
        timeouts.current.clear();
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                sendNotification,
                removeNotification,
                clearNotifications,
                stopTimeout,
                startTimeout,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
};
