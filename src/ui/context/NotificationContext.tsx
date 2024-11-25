import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
} from "react";
import { Notification } from "~/utils/types";

type Timeouts = Map<
    number,
    {
        start: number;
        timeout?: NodeJS.Timeout;
        totalTime: number;
        remainingTime: number;
    }
>;

interface NotificationContextType {
    notifications: Notification[];
    sendNotification: (message: string, type?: Notification["type"]) => void;
    removeNotification: (id: number) => void;
    clearNotifications: () => void;
    pauseNotification: (id: number) => void;
    resumeNotification: (id: number) => void;
    timeouts: React.MutableRefObject<Timeouts>["current"];
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);
let id = 0;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const timeouts = useRef<Timeouts>(new Map());

    const startTimeout = (idis: number, time: number = 5000) => {
        const start = Date.now();
        const timeout = setTimeout(() => {
            removeNotification(idis);
        }, time);

        const tmp = timeouts.current.get(idis);
        timeouts.current.set(idis, {
            timeout,
            totalTime: tmp?.totalTime || time,
            remainingTime: time,
            start,
        });
    };

    const pauseNotification = (idis: number) => {
        const timer = timeouts.current.get(idis);
        if (timer && timer.timeout) {
            clearTimeout(timer.timeout);
            const elapsedTime = Date.now() - (timer.start || 0);
            timeouts.current.set(idis, {
                ...timer,
                timeout: undefined,
                remainingTime: timer.remainingTime - elapsedTime,
            });
        }
    };

    const resumeNotification = (idis: number) => {
        const timer = timeouts.current.get(idis);
        if (timer && !timer.timeout && timer.remainingTime > 0) {
            startTimeout(idis, timer.remainingTime);
        }
    };

    const sendNotification = (
        data: Notification["data"],
        type: Notification["type"] = "success"
    ) => {
        const idis = id++;
        console.log("Sent notification", idis);
        setNotifications((prevNotif) => [
            ...prevNotif,
            { id: idis, type, data },
        ]);
        startTimeout(idis);
    };

    const removeNotification = (idis: number) => {
        setNotifications((prevNotif) =>
            prevNotif.filter((notif) => notif.id !== idis)
        );
        const timer = timeouts.current.get(idis);
        if (timer && timer.timeout) {
            clearTimeout(timer.timeout);
        }
        timeouts.current.delete(idis);
    };

    const clearNotifications = () => {
        setNotifications([]);
        timeouts.current.forEach(
            ({ timeout }) => timeout && clearTimeout(timeout)
        );
        timeouts.current.clear();
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                sendNotification,
                removeNotification,
                clearNotifications,
                pauseNotification,
                resumeNotification,
                timeouts: timeouts.current,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotificationContext must be used within a NotificationProvider"
        );
    }
    return context;
};
