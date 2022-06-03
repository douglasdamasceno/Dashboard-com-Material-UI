import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListTool } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBasePage } from '../../shared/layouts';
import { PersonService } from '../../shared/services/api/PersonService';

export const Persons: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {debounce} = useDebounce();
    const search = useMemo(()=>{
        return searchParams.get('search') || '';
    },[searchParams]);

    useEffect(()=>{
        debounce(()=>{
            PersonService.getAll(0,search)
                .then(persons=>{
                    if(persons instanceof Error){
                        alert(persons.message);
                    }else{
                        console.log(persons);
                    }
                });
        });    
    },[search]);

    return(
        <LayoutBasePage 
            title='Listagem de Pessoas' 
            toolbar={
            <ListTool 
                newButtonText='Nova' 
                isSearchInputVisible 
                isNewButtonVisible 
                searchText={search}
                onSearchTextChange={(newText)=> setSearchParams({search:newText},{replace:true})}
            />} 
        >
            Testando....
        </LayoutBasePage>
    );
}
