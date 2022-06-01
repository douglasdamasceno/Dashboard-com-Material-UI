
import {ReactNode,createContext,useCallback,useContext,useState} from 'react';

interface IDrawerContextData{
    isDrawerOpen:boolean;
    toggleDrawerOpen: ()=> void;
    drawerOptions:IDrawerOptions[];
    setDrawerOptions: (newDrawerOptions:IDrawerOptions[])=> void;
}
interface IContextProviderProps {
   children:ReactNode;
}
interface IDrawerOptions{
    path:string;
    icon:string;
    label:string;
}
const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = ()=> {
    return useContext(DrawerContext);
}

export const DrawerProvider = ({children }:IContextProviderProps) =>{
    const [isDrawerOpen,setIsDrawerOpen] = useState(false);
    const [drawerOptions,setDrawerOptions] = useState<IDrawerOptions[]>([]);
    
    const toggleDrawerOpen = useCallback(()=>{
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    },[]);

    const handleSetDrawerOptions = useCallback((newDrawerOptions:IDrawerOptions[])=>{
        setDrawerOptions(newDrawerOptions);
    },[]);

   
    
    return(
        <DrawerContext.Provider 
            value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions,setDrawerOptions:handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    )
}