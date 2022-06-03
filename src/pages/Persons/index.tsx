import React, { useEffect, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow,TableFooter,LinearProgress, Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { PersonService,IPerson } from '../../shared/services/api/PersonService';
import { ListTool } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBasePage } from '../../shared/layouts';
import {Environment} from '../../shared/environment';

export const Persons: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {debounce} = useDebounce();

    const [rows,setRows] = React.useState<IPerson[]>([]);
    const [totalCount,setTotalCount] = React.useState(0);
    const [isLoading,setIsLoading] = React.useState(true);
    
    const search = useMemo(()=>{
        return searchParams.get('search') || '';
    },[searchParams]);

    const page = useMemo(()=>{
        return Number(searchParams.get('page') || '1');
    },[searchParams]);

    useEffect(()=>{
        setIsLoading(true);
        debounce(()=>{
            PersonService.getAll(page,search)
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
           
    },[search,page]);

    return(
        <LayoutBasePage 
            title='Listagem de Pessoas' 
            toolbar={
            <ListTool 
                newButtonText='Nova' 
                isSearchInputVisible 
                isNewButtonVisible 
                searchText={search}
                onSearchTextChange={(newText)=> setSearchParams({search:newText,page:'1'},{replace:true})}
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
                   {totalCount===0 && !isLoading && (
                       <caption>{Environment.LISTAGEM_VAZIA}</caption>
                   )}
                   <TableFooter>
                       {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}> 
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}
                       {(totalCount>0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                 <TableCell colSpan={3}> 
                                    <Pagination 
                                        page={page}
                                        count={Math.ceil(totalCount/ Environment.LIMITE_DE_LINHAS)} 
                                        onChange={(e,newPage)=> setSearchParams({search,page:newPage.toString()},{replace:true})}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                   </TableFooter>
               </Table>
           </TableContainer>
        </LayoutBasePage>
    );
}
