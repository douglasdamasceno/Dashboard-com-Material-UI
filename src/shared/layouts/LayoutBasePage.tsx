import { Box,Icon, IconButton, Theme, Typography,useMediaQuery,useTheme } from '@mui/material';
import React from 'react';
import { useDrawerContext } from '../contexts';

interface ILayoutBasePageProps {
    title: string;
    children: React.ReactNode;
    toolbar?: React.ReactNode;
}
export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({children,title,toolbar}) => {
    
    const isSmDown = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));
    const isMdDown = useMediaQuery((theme:Theme)=>theme.breakpoints.down('md'));
    const theme = useTheme();

    const {toggleDrawerOpen} = useDrawerContext();

    return(
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
        <Box display='flex' alignItems='center'padding={1} gap={1} height={theme.spacing(isSmDown? 6: isMdDown ? 8: 12)}>
        {
            isSmDown &&
            <IconButton onClick={toggleDrawerOpen}>
                <Icon>menu</Icon>
            </IconButton>
        }
        <Typography 
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            variant={isSmDown ? 'h5': isMdDown? 'h4':'h3'}
        >
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
        <Box flex={1} overflow="auto">
            {children}
        </Box>
    </Box>
    );
}