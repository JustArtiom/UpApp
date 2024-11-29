import { Routes, Route, HashRouter } from "react-router-dom";
import Main from "./Main";
import RouterLayout from "~/layouts/RouterLayout";
import Booting from "~/pages/Booting";
import AddServer from "./AddServer";
import Name from "./Name";
import Settings from "./Settings";
import AppLayout from "~/layouts/AppLayout";
import Reload from "./Reload";

const Router = () => {
    return (
        <HashRouter>
            <RouterLayout>
                <Booting>
                    <Routes>
                        <Route path="/" element={<Reload />} />
                        <Route path="/name" element={<Name />} />
                        <Route path="/add-server" element={<AddServer />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/app" element={<AppLayout />}>
                            <Route index element={<Main />} />
                            <Route path=":server_id" element={<Main />} />
                            <Route
                                path=":server_id/:bucket_id"
                                element={<Main />}
                            />
                            <Route
                                path=":server_id/:bucket_id/:file_id"
                                element={<p>File preview</p>}
                            />
                        </Route>
                    </Routes>
                </Booting>
            </RouterLayout>
        </HashRouter>
    );
};

export default Router;
