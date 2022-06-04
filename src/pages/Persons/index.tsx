import React, { useEffect, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow,TableFooter,LinearProgress, Pagination, IconButton, Icon } from '@mui/material';
import { useSearchParams , useNavigate} from 'react-router-dom';

import { PersonService,IPerson } from '../../shared/services/api/PersonService';
import { ListTool } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBasePage } from '../../shared/layouts';
import {Environment} from '../../shared/environment';

export const Persons: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const {debounce} = useDebounce();
    
    const navigate = useNavigate();

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
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                }).finally(()=>{
                    setIsLoading(false);
                });
        }); 
           
    },[search,page]);

    const handleDelete = (id:number)=>{
        if(window.confirm('Realmente deseja apagar ?')){
            PersonService.deleteById(id)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                        
                    }else{
                        alert('Deleted');
                        setRows([...rows.filter(row=>row.id !== id)]);
                    }
                });
        }
    }
    
    return(
        <LayoutBasePage 
            title='Listagem de Pessoas' 
            toolbar={
            <ListTool 
                newButtonText='Nova' 
                isSearchInputVisible 
                isNewButtonVisible 
                searchText={search}
                onNewButtonClick={()=>navigate('/pessoas/nova')}
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
                       {rows.map(row=>(
                           <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <IconButton size='small' onClick={()=> navigate(`detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>
                                    <IconButton size='small' onClick={()=> handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                   </TableBody>
                   {totalCount===0 && !isLoading && (
                       <caption>{Environment.EMPTY_LISTING}</caption>
                   )}
                   <TableFooter>
                       {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}> 
                                    <LinearProgress variant='indeterminate' />
                                </TableCell>
                            </TableRow>
                        )}
                       {(totalCount>0 && totalCount > Environment.ROWS_LIMIT ) && (
                            <TableRow>
                                 <TableCell colSpan={3}> 
                                    <Pagination 
                                        page={page}
                                        count={Math.ceil(totalCount/ Environment.ROWS_LIMIT )} 
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
