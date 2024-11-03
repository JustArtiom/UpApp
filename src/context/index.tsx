import { ErrorProvider } from "./errorContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    return <ErrorProvider>{children}</ErrorProvider>;
};

export default ContextProvider;
