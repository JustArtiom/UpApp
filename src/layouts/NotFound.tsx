import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            404 {document.URL}{" "}
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default PageNotFound;
