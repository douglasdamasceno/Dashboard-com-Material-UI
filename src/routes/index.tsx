import { Route, Routes } from "react-router-dom";
import {useDrawerContext} from '../shared/contexts';
import { useEffect } from "react";
import { Dashboard } from "../pages";

export default function AppRoute(){
    const {setDrawerOptions} = useDrawerContext();

    useEffect(()=>{
        setDrawerOptions([
            {
                label:'Página Inicial',
                icon:'home',
                path:'/pagina-inicial',
            },
            {
                label:'star',
                icon:'start',
                path:'/aa',
            },
        ]);
    },[]);

    return(
        
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />}/>
        </Routes>
    )
};