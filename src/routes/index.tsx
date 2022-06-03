import { Route, Routes } from "react-router-dom";
import {useDrawerContext} from '../shared/contexts';
import { useEffect } from "react";
import {  Cities, Dashboard, Persons } from "../pages";

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
            {
                label:'Pessoas',
                icon:'person',
                path:'/pessoas',
            },
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />}/>
            <Route path="/cidades" element={<Cities />}/>
            <Route path="/pessoas" element={<Persons />}/>
            {/* <Route path="/cidades/detalhe/:id" element={<Cities />}/> */}
            <Route path="*" element={<Dashboard />}/>
        </Routes>
    )
};