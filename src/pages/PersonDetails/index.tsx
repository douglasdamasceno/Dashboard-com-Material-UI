import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTool } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { PersonService } from '../../shared/services/api/PersonService';

export const PersonDetails: React.FC = () => {
    const {id ='nova'} = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [personsName,setPersonsName] = useState('');

    const handleDelete = (id:number)=>{
        if(window.confirm('Realmente deseja apagar ?')){
            PersonService.deleteById(id)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                        navigate('/pessoas');
                        
                    }else{
                        alert('Deleted');
                        navigate('/pessoas');
                    }
                });
        }
    }
    const handleSave = () => {
        console.log('save');
    }

    useEffect(() => {
        if(id !=='nova'){
            setIsLoading(true);
            PersonService.getById(Number(id))
            .then(result=>{
                if(result instanceof Error){
                    alert(result.message);
                    navigate('/pessoas');
                }else{
                    console.log(result);
                    setPersonsName(result.name);
                }
            }).finally(()=>{
                setIsLoading(false);
            });
        }
    },[id]);

    return (
        <LayoutBasePage 
            title={id ==='nova' ? 'Nova Pessoa' : personsName}  
            toolbar={
                <DetailTool 
                    newButtonText='Nova'
                    isSaveAndCloseButtonVisible
                    isNewButtonVisible={id !== 'nova'}
                    isDeleteButtonVisible={id !== 'nova'}

                    onBackButtonClick={()=> navigate('/pessoas')}
                    onNewButtonClick={()=> navigate('/pessoas/nova')}
                    onSaveAndCloseButtonClick={()=>{}}
                    onDeleteButtonClick={()=> handleDelete(Number(id))}
                    onSaveButtonClick={()=> handleSave()}
                />
            }
            >
             {isLoading && <LinearProgress variant='indeterminate' />}   
            <div>PersonDetails {id}</div>
        </LayoutBasePage>
    );
}
