import { useEffect } from "react";

const Reload = (): null => {
    useEffect(() => {
        window.location.reload();
    }, []);
    return null;
};

export default Reload;
