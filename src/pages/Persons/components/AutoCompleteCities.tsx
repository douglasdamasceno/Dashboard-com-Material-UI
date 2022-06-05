import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CityService } from '../../../shared/services/api/CityService';

type TAutoCompleteOptions = {
    id: number;
    label: string;
}

interface IAutoCompleteCitiesProps {
    isExternalLoading ?: boolean;
}

const AutoCompleteCities: React.FC<IAutoCompleteCitiesProps> = ({isExternalLoading = false}) => {

    const {registerField,fieldName,clearError,defaultValue,error} = useField('cityId');
    const {debounce} = useDebounce();
    
    const [selectedId,setSelectedId] = useState<number | undefined >(defaultValue);

    const [options, setOptions] = useState<TAutoCompleteOptions[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    const [search,setSearch] = useState('');
    
    
    
    useEffect(()=>{
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue:(_,newSelectedId)=> setSelectedId(newSelectedId),
        });
    },[registerField,fieldName,selectedId]);


    useEffect(() => {
        setIsLoading(true);
        debounce(()=>{
            CityService.getAll(1,search)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                       setOptions(result.data.map(city=>({id:city.id, label:city.name})));
                    }
                }).finally(()=>{
                    setIsLoading(false);
                });
        }); 
        console.log(options);
    },[search])

    const autoCompleteSelectedOption = useMemo(()=>{
        if(!selectedId) return null;

        const selectedOption = options.find(option=>option.id === selectedId);
        if(!selectedOption) return null;

        return selectedOption;
    },[selectedId,options]);

    return (
        <Autocomplete
            disabled={isExternalLoading}
            loading={isLoading}
            popupIcon={( isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            
            options={options}
            value={autoCompleteSelectedOption}
            
            onInputChange={(_,newValue)=>{setSearch(newValue)}}
            onChange={(_,newValue)=>{setSelectedId(newValue?.id); setSearch('');clearError();}}
            
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."
            clearText="Limpar"
            
            disablePortal

            renderInput={(params) => <TextField 
                {...params} 
                label="Cidade" 
                variant="outlined" 
                error={!!error}
                helperText={error}
            />}
        />
    );
}

export default AutoCompleteCities;