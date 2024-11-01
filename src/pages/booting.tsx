import Loading from "~/components/loading";

export default function Booting() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <p className="mb-10 font-bold text-2xl">Developing Your Journey</p>
            <Loading size="sm" />
        </div>
    );
}
