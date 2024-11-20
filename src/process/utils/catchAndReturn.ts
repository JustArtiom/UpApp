const catchAndReturn =
    <T>(
        cb: (...opts: any[]) => Promise<T> | T
    ): ((...opts: any[]) => Promise<T | { error: true; data?: string }>) =>
    async (...opts2) => {
        try {
            return await cb(...opts2);
        } catch (err) {
            return { error: true, data: err.toString() };
        }
    };

export default catchAndReturn;
