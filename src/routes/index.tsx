import { Route, Routes } from "react-router-dom";

export default function AppRoute(){
    return(
        <Routes>
            <Route path="/" element={<div><h1>App</h1></div>} />
        </Routes>
    )
};