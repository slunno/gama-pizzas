import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout.jsx";

import Home from "../pages/Home/Home.jsx";


function AppRoutes() {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />
        </Routes>
    );
}


export default AppRoutes;