
import {ReactNode,createContext,useCallback,useContext,useMemo,useState} from 'react';

interface IDrawerContextData{
    isDrawerOpen:boolean;
    toggleDrawerOpen: ()=> void;
}
interface IContextProviderProps {
   children:ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = ()=> {
    return useContext(DrawerContext);
}

export const DrawerProvider = ({children }:IContextProviderProps) =>{
    const [isDrawerOpen,setIsDrawerOpen] = useState(false);
    
    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    },[]);

   
    
    return(
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}