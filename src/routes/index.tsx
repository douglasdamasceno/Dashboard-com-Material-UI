import { Route, Routes } from "react-router-dom";
import {Button} from '@mui/material';
import {useAppThemeContext} from '../shared/contexts';

export default function AppRoute(){
    const {toggleTheme} = useAppThemeContext();
    return(
        
        <Routes>
            <Route path="/" element={<Button onClick={toggleTheme} variant='contained' color="primary">Teste</Button>} />
        </Routes>
    )
};