import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import sleep from "~/utils/sleep";

const useRedirect = (id: string = "app-body") => {
    const navigateTo = useNavigate();
    const elemRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const elem = document.getElementById(id);
        if (!elem) return;

        elemRef.current = elem;

        return () => {
            elemRef.current = null;
        };
    }, [id]);

    return async (url: string | number, duration: false | number = 300) => {
        if (elemRef.current && duration) {
            elemRef.current.style.opacity = "0";
            await sleep(duration);
            elemRef.current.style.opacity = "1";
        }

        console.log("Redirecting to", url);
        if (typeof url === "number") {
            navigateTo(url);
        } else {
            navigateTo(url);
        }
    };
};

export default useRedirect;
