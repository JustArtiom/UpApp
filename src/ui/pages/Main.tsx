import Button from "~/components/Button";
import useRedirect from "~/hooks/useRedirect";

const Main = () => {
    const redirect = useRedirect();

    return (
        <div>
            Hello world <Button onClick={() => {}}>throw error</Button>
            <Button onClick={() => redirect("/add-server")}>add server</Button>
        </div>
    );
};

export default Main;
