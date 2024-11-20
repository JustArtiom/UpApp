const ErrorFallback = ({ error }: { error: any }) => {
    return (
        <div
            role="alert"
            className="w-full h-full flex-1 flex-col flex items-center justify-center"
        >
            <p className="font-bold text-2xl mb-5 mt-5">Render Error</p>
            <pre className="max-w-[60%] text-red-400 break-words whitespace-pre-wrap ">
                {error.message}
            </pre>
        </div>
    );
};

export default ErrorFallback;
