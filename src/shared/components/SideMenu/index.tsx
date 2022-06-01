import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import {ReactNode} from 'react';

interface IProps {
    children:ReactNode;
 }
 
export function SideMenu({children}:IProps)  {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
      <>
        <Drawer open={true} variant={isSmDown ? 'temporary': 'permanent'}>
          <Box 
            width={theme.spacing(28)}
            display='flex'
            flexDirection='column'
            height='100%'
          >
            <Box 
              width="100%" 
              height={theme.spacing(20)}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar 
                sx={{height:theme.spacing(12), width:theme.spacing(12)}}
                alt="Douglas Damasceno"
                src="https://avatars.githubusercontent.com/u/33847803?v=4" />
            </Box>

            <Divider />
            
            <Box flex={1}>
              <List component="nav">
                <ListItemButton>
                  <ListItemIcon>
                    <Icon >home</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Página inicial" />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>

      <Box height="100vh" marginLeft={isSmDown? 0 :theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}