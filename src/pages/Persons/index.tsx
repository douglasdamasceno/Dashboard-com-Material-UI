import React, { useEffect, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { PersonService,IPerson } from '../../shared/services/api/PersonService';
import { ListTool } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBasePage } from '../../shared/layouts';
import { TableRows } from '@mui/icons-material';

export const Persons: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {debounce} = useDebounce();

    const [rows,setRows] = React.useState<IPerson[]>([]);
    const [totalCount,setTotalCount] = React.useState(0);
    const [isLoading,setIsLoading] = React.useState(true);
    
    const search = useMemo(()=>{
        return searchParams.get('search') || '';
    },[searchParams]);

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            PersonService.getAll(0,search)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                        console.log(result);
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                }).finally(()=>{
                    setIsLoading(false);
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
           <TableContainer component={Paper} variant="outlined" sx={{m:1, width:'auto'}} >
               <Table>
                   <TableHead>
                       <TableRow>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ações</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       { rows.map(row=>(
                           <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        ))}
                   </TableBody>
               </Table>
           </TableContainer>
        </LayoutBasePage>
    );
}
