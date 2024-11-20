import { createContext, useContext, useEffect, useState } from "react";
import { DBSettings } from "~/utils/types";

interface SettingsContextType {
    settings: DBSettings;
    updateSettings: (prop: DBSettings) => Promise<void>;
    setSettings: React.Dispatch<React.SetStateAction<DBSettings>>;
}

const SettingsContext = createContext<SettingsContextType>(undefined);

export const SettingsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [settings, setSettings] = useState<DBSettings>();

    const updateSettings = async (updating: DBSettings) => {
        await window.api.db.patchSettings(updating).then((x) => {
            console.log("Setting changes", updating, "\nCommited", x);
        });
        setSettings((old) => ({ ...old, ...updating }));
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSettings,
                setSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            "useSettingsContext must be used within an SettingsProvider"
        );
    }

    return context;
};
