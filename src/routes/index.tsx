import { Route, Routes } from "react-router-dom";
import {useDrawerContext} from '../shared/contexts';
import { useEffect } from "react";
import {  Cities, Dashboard, Persons, PersonDetails } from "../pages";


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
            <Route path="/pessoas/detalhe/:id" element={<PersonDetails />}/>
            <Route path="/pessoas/nova" element={<PersonDetails />}/>
            <Route path="*" element={<Dashboard />}/>
        </Routes>
    )
};