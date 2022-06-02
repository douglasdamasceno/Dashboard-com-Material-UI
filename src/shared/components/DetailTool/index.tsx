import { Box, Button, Divider, Icon, Paper,useTheme } from '@mui/material';
import React from 'react';


interface IListToolProps{
    newButtonText?:string;

    isNewButtonVisible?:boolean;
    isBackButtonVisible?:boolean;
    isDeleteButtonVisible?:boolean;
    isSaveButtonVisible?:boolean;
    isSaveAndBackButtonVisible?:boolean;

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
            isSaveButtonVisible &&
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
            isSaveAndBackButtonVisible &&
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
            isDeleteButtonVisible &&
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
        isNewButtonVisible &&
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
    <Divider variant="middle" orientation='vertical' />
    {
        isBackButtonVisible &&
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
    </Box>
  );
}
