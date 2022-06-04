import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTool } from '../../shared/components';
import { VTextField } from '../../shared/components/forms/VTextField';
import { LayoutBasePage } from '../../shared/layouts';
import { PersonService } from '../../shared/services/api/PersonService';


interface IFormData {
    name: string;
    email: string;
    cityId: number;
}

export const PersonDetails: React.FC = () => {
    
    const formRef = useRef<FormHandles>(null);

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
    const handleSave = (dados:IFormData) => {
        console.log('save',dados);
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
                    onDeleteButtonClick={()=> handleDelete(Number(id))}
                    onSaveButtonClick={()=> formRef.current?.submitForm()}
                    onSaveAndCloseButtonClick={()=> formRef.current?.submitForm()}
                />
            }
            >
            {isLoading && <LinearProgress variant='indeterminate' />}   
            <Form ref={formRef} onSubmit={handleSave}>
                <VTextField name='name' />
                <VTextField name='email' />
                <VTextField name='cityId' />

            </Form>
        </LayoutBasePage>
    );
}
