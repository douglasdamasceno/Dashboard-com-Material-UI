import { Box, Button, Divider, Icon, Paper,Skeleton,useTheme } from '@mui/material';
import React from 'react';


interface IListToolProps{
    newButtonText?:string;

    isNewButtonVisible?:boolean;
    isBackButtonVisible?:boolean;
    isDeleteButtonVisible?:boolean;
    isSaveButtonVisible?:boolean;
    isSaveAndBackButtonVisible?:boolean;
    
    isNewButtonLoading?:boolean;
    isBackButtonLoading?:boolean;
    isDeleteButtonLoading?:boolean;
    isSaveButtonLoading?:boolean;
    isSaveAndBackButtonLoading?:boolean;

    onNewButtonClick?:()=>void;
    onBackButtonClick?:()=>void;
    onDeleteButtonClick?:()=>void;
    onSaveButtonClick?:()=>void;
    onSaveAndBackButtonClick?:()=>void;
}

export function DetailTool ({
    newButtonText = 'Novo',

    isNewButtonVisible = true,
    isBackButtonVisible = true,
    isDeleteButtonVisible = true,
    isSaveButtonVisible = true,
    isSaveAndBackButtonVisible = false,
    
    isNewButtonLoading = false,
    isBackButtonLoading = false,
    isDeleteButtonLoading = false,
    isSaveButtonLoading = false,
    isSaveAndBackButtonLoading = false,

    onNewButtonClick,
    onBackButtonClick,
    onDeleteButtonClick,
    onSaveButtonClick,
    onSaveAndBackButtonClick,

}:IListToolProps) {
    const theme = useTheme();
  return (
    <Box 
        display='flex'
        alignItems='center'
        height={theme.spacing(5)} 
        component={Paper}
        marginX={1}   
        padding={1}
        paddingX={2}
        gap={1}
    >
        {
            (isSaveButtonVisible && !isSaveButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='contained'
                startIcon={<Icon>save</Icon>}
                onClick={onSaveButtonClick}
            >
                Salvar
            </Button>
        }
        
        {
            isSaveButtonLoading && 
            <Skeleton width={110} height={60} />
        }
         {
            (isSaveAndBackButtonVisible && !isSaveAndBackButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>save</Icon>}
                onClick={onSaveAndBackButtonClick}
            >
                Salvar e voltar
            </Button>
        }
         {
             isSaveAndBackButtonLoading && 
             <Skeleton width={180} height={60} />
         }
        {
            (isDeleteButtonVisible && !isDeleteButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>delete</Icon>}
                onClick={onDeleteButtonClick}
                >
                Apagar
            </Button>
        }
         {
             isDeleteButtonLoading && 
             <Skeleton width={110} height={60} />
         }

        {
            (isNewButtonVisible && !isNewButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>add</Icon>}
                onClick={onNewButtonClick}
                >
                {newButtonText}
             </Button>
        }
         {
             isNewButtonLoading && 
             <Skeleton width={110} height={60} />
         }
        <Divider variant="middle" orientation='vertical' />
        {
            (isBackButtonVisible && !isBackButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>arrow_back</Icon>}
                onClick={onBackButtonClick}
                >
            Voltar
            </Button>
        }
        {
            isBackButtonLoading && 
            <Skeleton width={110} height={60} />
        }
    </Box>
  );
}
