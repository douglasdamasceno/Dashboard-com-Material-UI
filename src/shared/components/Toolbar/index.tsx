import { Box, Button, useTheme, Paper, TextField, Icon } from '@mui/material';

interface IToolbarProps{
    search?:string;
    isSearchInputVisible?:boolean;
    onSearchTextChange?:(newText:string)=>void;
    
    newButtonText?:string;
    isNewButtonVisible?:boolean;
    onNewButtonClick?:()=>void;

}

export function Toolbar({
    search,isSearchInputVisible,onSearchTextChange,
    newButtonText = 'Novo',isNewButtonVisible,onNewButtonClick
}:IToolbarProps) {
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
                isSearchInputVisible &&

                <TextField 
                    size='small'
                    placeholder='Pesquisar'
                    value={search}
                    onChange={(e)=> onSearchTextChange?.(e.target.value)}
                />
            }
            {
                isNewButtonVisible &&
                <Box display='flex' flex={1} justifyContent="end">
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        endIcon={<Icon>addd</Icon>}
                        onClick={onNewButtonClick}
                        >
                        {newButtonText}
                    </Button>
                </Box>
            }
      </Box>
  );
}
