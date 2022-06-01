import { Route, Routes } from "react-router-dom";
import {Button} from '@mui/material';
import {useDrawerContext} from '../shared/contexts';

export default function AppRoute(){
    const {toggleDrawerOpen} = useDrawerContext();
    return(
        
        <Routes>
            <Route path="/" element={<Button onClick={toggleDrawerOpen} variant='contained' color="primary">Toggle Drawer</Button>} />
        </Routes>
    )
};