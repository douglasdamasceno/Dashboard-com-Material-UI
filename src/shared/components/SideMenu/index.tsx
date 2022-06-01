import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import {ReactNode} from 'react';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
interface IProps {
    children:ReactNode;
 }

interface IListItemLinkProps {
  label:string;
  icon:string;
  to:string;
  onClick?:()=>void;
}
const ListItemLink : React.FC<IListItemLinkProps> = 
  ({icon,label,to,onClick})=>{
  
  const navigate = useNavigate();  
  const resolvedPath = useResolvedPath(to); 
  const match = useMatch({path:resolvedPath.pathname,end:false});
  const handleClick = ()=>{
    onClick?.();
    navigate(to);
  }

  return(  
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon >{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export function SideMenu({children}:IProps)  {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {isDrawerOpen,toggleDrawerOpen,drawerOptions} = useDrawerContext();

  return (
      <>
        <Drawer 
          open={isDrawerOpen} 
          variant={isSmDown ? 'temporary': 'permanent'}
          onClose={toggleDrawerOpen} 
        >
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
              {drawerOptions.map(drawerOption=>(
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  label={drawerOption.label}
                  onClick={isSmDown ? toggleDrawerOpen:undefined}
                  />
                ))}
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