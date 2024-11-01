import { Routes, Route, HashRouter } from "react-router-dom";
import Booting from "./booting";
import Welcome from "./welcome";
import ActionBar from "~/components/actionBar";

export default function Router() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <ActionBar />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Booting />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="*" element={<>404 {document.URL}</>} />
                </Routes>
            </HashRouter>
        </div>
    );
}
