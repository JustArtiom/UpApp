import { Routes, Route, HashRouter } from "react-router-dom";
import Main from "./Main";
import RouterLayout from "~/layouts/RouterLayout";
import Booting from "~/pages/Booting";
import AddServer from "./AddServer";
import Name from "./Name";

const Router = () => {
    return (
        <RouterLayout>
            <HashRouter>
                <Booting>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/name" element={<Name />} />
                        <Route path="/add-server" element={<AddServer />} />
                        <Route
                            path="/app"
                            element={
                                <p>Server Auto Select {window.location.href}</p>
                            }
                        />
                        <Route path="/app/settings" element={<p>Settings</p>} />
                        <Route
                            path="/app/:server_id"
                            element={<p>Server & auto bucket select</p>}
                        />
                        <Route
                            path="/app/:server_id/:bucket_id"
                            element={<p>File manager</p>}
                        />
                        <Route
                            path="/app/:server_id/:bucket_id/:file_id"
                            element={<p>File preview</p>}
                        />
                    </Routes>
                </Booting>
            </HashRouter>
        </RouterLayout>
    );
};

export default Router;
