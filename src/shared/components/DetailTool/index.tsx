import { Box, Button, Divider, Icon, Paper,Skeleton,Theme,Typography,useMediaQuery,useTheme } from '@mui/material';


interface IListToolProps{
    newButtonText?:string;

    isNewButtonVisible?:boolean;
    isBackButtonVisible?:boolean;
    isDeleteButtonVisible?:boolean;
    isSaveButtonVisible?:boolean;
    isSaveAndCloseButtonVisible?:boolean;
    
    isNewButtonLoading?:boolean;
    isBackButtonLoading?:boolean;
    isDeleteButtonLoading?:boolean;
    isSaveButtonLoading?:boolean;
    isSaveAndCloseButtonLoading?:boolean;

    onNewButtonClick?:()=>void;
    onBackButtonClick?:()=>void;
    onDeleteButtonClick?:()=>void;
    onSaveButtonClick?:()=>void;
    onSaveAndCloseButtonClick?:()=>void;
}

export function DetailTool ({
    newButtonText = 'Novo',

    isNewButtonVisible = true,
    isBackButtonVisible = true,
    isDeleteButtonVisible = true,
    isSaveButtonVisible = true,
    isSaveAndCloseButtonVisible = false,
    
    isNewButtonLoading = false,
    isBackButtonLoading = false,
    isDeleteButtonLoading = false,
    isSaveButtonLoading = false,
    isSaveAndCloseButtonLoading = false,

    onNewButtonClick,
    onBackButtonClick,
    onDeleteButtonClick,
    onSaveButtonClick,
    onSaveAndCloseButtonClick: onSaveAndBackButtonClick,

}:IListToolProps) {
    const isSmDown = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

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
                <Typography 
                    variant='button'
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    Salvar
                </Typography>
            </Button>
        }
        
        {
            isSaveButtonLoading && 
            <Skeleton width={110} height={60} />
        }
         {
            (isSaveAndCloseButtonVisible && !isSaveAndCloseButtonLoading && !isSmDown && !isMdDown) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>save</Icon>}
                onClick={onSaveAndBackButtonClick}
            >
                <Typography 
                    variant='button'
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    Salvar e Fechar
                </Typography>
            </Button>
        }
         {
             (isSaveAndCloseButtonLoading && !isSmDown && !isMdDown) && 
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
                <Typography 
                    variant='button'
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    Apagar
                </Typography>    
            </Button>
        }
         {
             isDeleteButtonLoading && 
             <Skeleton width={110} height={60} />
         }

        {
            (isNewButtonVisible && !isNewButtonLoading && !isSmDown) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>add</Icon>}
                onClick={onNewButtonClick}
                >
                <Typography 
                    variant='button'
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {newButtonText}
                </Typography>
             </Button>
        }
         {
             (isNewButtonLoading && !isSmDown) && 
             <Skeleton width={110} height={60} />
         }
        {
            (isBackButtonVisible && (
                isNewButtonVisible ||
                isDeleteButtonVisible ||
                isSaveButtonVisible ||
                isSaveAndCloseButtonVisible
            )) &&
            <Divider variant="middle" orientation='vertical' />
        } 
        {
            (isBackButtonVisible && !isBackButtonLoading) &&
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>arrow_back</Icon>}
                onClick={onBackButtonClick}
                >
                <Typography 
                    variant='button'
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    Voltar
                </Typography>
            </Button>
        }
        {
            isBackButtonLoading && 
            <Skeleton width={110} height={60} />
        }
    </Box>
  );
}
