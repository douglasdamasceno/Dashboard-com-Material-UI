import { useCallback, useRef } from "react";
/**
 * @param delay informe o tempo de delay em milisegundos,
 * valor padrão ```300ms```.
 * @param notDelayInFirstTime informe se o delay não deve ser aplicado na primeira vez que o componente é renderizado,
 * valor padrão ```true```.
 * @returns retorno void.
 */
export const useDebounce = (delay=300,notDelayInFirstTime=true)=>{
    const isFirstTime = useRef(notDelayInFirstTime);
    const debouncing = useRef<NodeJS.Timeout>();

    const debounce = useCallback((func:()=> void)=>{
        if(isFirstTime.current){
            isFirstTime.current = false;
            func();
        }else{

            if(debouncing.current){
                clearTimeout(debouncing.current);
            }
            debouncing.current = setTimeout(()=> func(),delay);
        }
    },[]);

    return {debounce};
};