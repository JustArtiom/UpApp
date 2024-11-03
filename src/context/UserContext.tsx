import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
    username: string | undefined | null;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | undefined | null>(
        undefined
    );

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within an UserProvider");
    }
    return context;
};
