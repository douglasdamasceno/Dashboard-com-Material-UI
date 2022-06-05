import { LinearProgress,Box, Paper,Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { DetailTool } from '../../shared/components';
import { VTextField,VForm, useVForm, IVFormErros } from '../../shared/components/forms';
import { LayoutBasePage } from '../../shared/layouts';
import { CityService } from '../../shared/services/api/CityService';


interface IFormData {
    name: string;
}

const formValidationSchema : Yup.SchemaOf<IFormData> = Yup.object().shape({
    name: Yup.string().required(),
});

export const CityDetails: React.FC = () => {
    
    const {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const {id ='nova'} = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [citiesName,setCitiesName] = useState('');

    const handleDelete = (id:number)=>{
        if(window.confirm('Realmente deseja apagar ?')){
            CityService.deleteById(id)
                .then(result=>{
                    if(result instanceof Error){
                        alert(result.message);
                        navigate('/cidades');
                        
                    }else{
                        alert('Deleted');
                        navigate('/cidades');
                    }
                });
        }
    }
    const handleSave = (data:IFormData) => {

        formValidationSchema.validate(data, {abortEarly: false})
            .then((dataValidation)=>{
                setIsLoading(true);
                if(id==='nova'){
                     CityService.create(dataValidation)
                         .then(result=>{
                             if(result instanceof Error){
                                 alert(result.message);
                             }else{
                                 if(isSaveAndClose()){
                                     navigate('/cidades');
                                 }else{
                                     navigate(`/cidades/detalhe/${result}`);
                                 }
                             }
                         }).finally(()=>setIsLoading(false));
                }else{
                     setIsLoading(true);
                     CityService.updateById(Number(id),{id:Number(id),...dataValidation})
                         .then(result=>{
                             if(result instanceof Error){
                                 alert(result.message);
                             }else{
                                 alert('Updated');
                                 if(isSaveAndClose()){
                                     navigate('/cidades');
                                 }
                             }
                         }).finally(()=>setIsLoading(false));
                }
            })
            .catch((errors:Yup.ValidationError)=>{
                const validationErrors : IVFormErros ={};
                errors.inner.forEach(error  => {
                    if(!error.path) return;
                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });
    }

    useEffect(() => {
        if(id !=='nova'){
            setIsLoading(true);
            CityService.getById(Number(id))
            .then(result=>{
                if(result instanceof Error){
                    alert(result.message);
                    navigate('/cidades');
                }else{
                    setCitiesName(result.name);
                    formRef.current?.setData(result);
                }
            }).finally(()=>{
                setIsLoading(false);
            });
        }else{
            formRef.current?.setData({name:''});
        }
    },[id]);

    return (
        <LayoutBasePage 
            title={id ==='nova' ? 'Nova Cidade' : citiesName}  
            toolbar={
                <DetailTool 
                    newButtonText='Nova'
                    isSaveAndCloseButtonVisible
                    isNewButtonVisible={id !== 'nova'}
                    isDeleteButtonVisible={id !== 'nova'}

                    onBackButtonClick={()=> navigate('/cidades')}
                    onNewButtonClick={()=> navigate('/cidades/nova')}
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
                                    placeholder='Nome da Cidade' 
                                    name='name'
                                    label='Nome'
                                    fullWidth 
                                    disabled={isLoading}
                                    onChange={(e)=>setCitiesName(e.target.value)}
                                    />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBasePage>
    );
}
