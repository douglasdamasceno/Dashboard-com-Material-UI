import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListTool } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { PersonService } from '../../shared/services/api/PersonService';

export const Persons: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    
    const search = useMemo(()=>{
        return searchParams.get('search') || '';
    },[searchParams]);

    useEffect(()=>{
        PersonService.getAll(0,search)
            .then(persons=>{
                if(persons instanceof Error){
                    alert(persons.message);
                }
                console.log(persons);
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
