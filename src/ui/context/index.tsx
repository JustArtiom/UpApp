import { SettingsProvider } from "./SettingsContext";

const AllContextProvider = ({ children }: { children: React.ReactNode }) => {
    return <SettingsProvider>{children}</SettingsProvider>;
};

export default AllContextProvider;
