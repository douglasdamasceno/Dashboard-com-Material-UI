import { Box } from '@mui/system';
import { Icon, IconButton, Theme, Typography,useMediaQuery,useTheme } from '@mui/material';
import React from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBasePageProps {
    title: string;
    children: React.ReactNode;
    toolbar?: React.ReactNode;
}
export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({children,title,toolbar}) => {
    
    const isSmDown = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));
    const theme = useTheme();

    const {toggleDrawerOpen} = useDrawerContext();

    return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
        <Box display='flex' alignItems='center'padding={1} height={theme.spacing(12)}>
        {
            isSmDown &&
            <IconButton onClick={toggleDrawerOpen}>
                <Icon>menu</Icon>
            </IconButton>
        }
        <Typography variant="h5">
            {title}
        </Typography>
        </Box>
        {
            toolbar &&(
                <Box>
                    {toolbar}
                </Box>
            )
        }
        <Box>
            {children}
        </Box>
    </Box>
    );
}