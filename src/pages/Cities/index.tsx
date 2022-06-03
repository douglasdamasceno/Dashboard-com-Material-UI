import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListTool } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Cities: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    
    const search = useMemo(()=>{
        return searchParams.get('search') || '';
    },[searchParams]);

  return(
    <LayoutBasePage 
        title='Listagem de Cidades' 
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
