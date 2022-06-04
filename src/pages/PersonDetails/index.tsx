import { LinearProgress,Box, Paper,Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailTool } from '../../shared/components';
import { VTextField,VForm, useVForm } from '../../shared/components/forms';
import { LayoutBasePage } from '../../shared/layouts';
import { PersonService } from '../../shared/services/api/PersonService';


interface IFormData {
    name: string;
    email: string;
    cityId: number;
}

export const PersonDetails: React.FC = () => {
    
    const {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
        setIsLoading(true);
       if(id==='nova'){
            PersonService.create(dados)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                        if(isSaveAndClose()){
                            navigate('/pessoas');
                        }else{
                            navigate(`/pessoas/detalhe/${result}`);
                        }
                    }
                }).finally(()=>setIsLoading(false));
       }else{
            setIsLoading(true);
            PersonService.updateById(Number(id),{id:Number(id),...dados})
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                    }else{
                        alert('Updated');
                        // navigate('/pessoas');
                        if(isSaveAndClose()){
                            navigate('/pessoas');
                        }
                    }
                }).finally(()=>setIsLoading(false));
       }
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
                    setPersonsName(result.name);
                    formRef.current?.setData(result);
                }
            }).finally(()=>{
                setIsLoading(false);
            });
        }else{
            formRef.current?.setData({name:'',email:'',cityId:''});
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
                    onSaveButtonClick={save}
                    onSaveAndCloseButtonClick={saveAndClose}
                />
            }
            >
            
            <VForm ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'> 
                    <Grid container direction="column" padding={2} spacing={2}>
                        {
                            isLoading &&
                            <Grid item xs={12}>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                <VTextField 
                                    placeholder='Nome' 
                                    name='name'
                                    label='Nome'
                                    fullWidth 
                                    disabled={isLoading}
                                    onChange={(e)=>setPersonsName(e.target.value)}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} md={6}>
                                <VTextField 
                                    placeholder='Email' 
                                    name='email'
                                    label='Email'
                                    fullWidth 
                                    disabled={isLoading}
                                    />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <VTextField 
                                    placeholder='Email2' 
                                    name='email2'
                                    label='Email2'
                                    fullWidth 
                                    disabled={isLoading}
                                    />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={6}>
                                <VTextField 
                                    placeholder='Cidade id'
                                     name='cityId'
                                     label='Cidade'
                                     fullWidth 
                                     disabled={isLoading}
                                     />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBasePage>
    );
}
