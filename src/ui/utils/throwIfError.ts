const throwIfError = <T>(err: T) => {
    // @ts-expect-error
    if (err && err.error) throw new Error(err.data);
    else return err as T;
};

export default throwIfError;
