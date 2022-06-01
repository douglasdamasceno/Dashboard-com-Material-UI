import { Box } from '@mui/system';
import React from 'react';

interface ILayoutBasePageProps {
    title: string;
    children: React.ReactNode;
}
export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({children,title}) => {
  return(
    <Box >
        Teste
        {title}
        {children}
    </Box>
    );
}