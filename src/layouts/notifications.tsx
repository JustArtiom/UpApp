import { useErrorContext } from "~/context/errorContext";

const NotificationLayout = () => {
    const { errors, removeError } = useErrorContext();

    return (
        <div className="absolute bottom-0 right-0 z-20">
            {errors.map((error) => (
                <div
                    key={error.id}
                    className="bg-[var(--bg-primary)] rounded-xl border-[1px] p-2 w-[300px] border-red-500 m-5 hover:scale-[101%] transition-transform cursor-pointer"
                    onClick={() => removeError(error.id)}
                >
                    <p>{error.message}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationLayout;
