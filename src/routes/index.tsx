import { Route, Routes } from "react-router-dom";
import {useDrawerContext} from '../shared/contexts';
import { useEffect } from "react";
import { Cities, Dashboard } from "../pages";

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
                label:'Cidades',
                icon:'location_city',
                path:'/cidades',
            },
        ]);
    },[]);

    return(
        
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />}/>
            <Route path="/cidades" element={<Cities />}/>
            {/* <Route path="/cidades/detalhe/:id" element={<Cities />}/> */}
            <Route path="*" element={<Dashboard />}/>
        </Routes>
    )
};