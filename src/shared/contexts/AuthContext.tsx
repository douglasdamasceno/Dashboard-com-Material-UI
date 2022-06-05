import React, {createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';


interface IAuthContext {
    isAuthenticated: boolean;
    logout:() => void;
    login: (email:string, password:string) => Promise<string | void>;
}

interface IAuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {

    const [acessToken, setAcessToken] = useState<string>();

    useEffect(()=>{
        const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        if(token){
            setAcessToken(token);
        }else{
            setAcessToken(undefined);
        }

    },[]);
    
    const isAuthenticated = useMemo(() => !!acessToken, [acessToken]);
    

    const handleLogin = useCallback(async (email:string, password:string) => {
        const result = await AuthService.auth(email, password); 
        if(result instanceof Error){
            return result.message;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.accessToken));
        setAcessToken(result.accessToken);          
    } , []);
    
    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        setAcessToken(undefined);
    } , []);
    
  return (
      <AuthContext.Provider value={{isAuthenticated,login:handleLogin,logout:handleLogout}}>
          {children}
      </AuthContext.Provider>
  );
}
