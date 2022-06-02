import {createTheme} from "@mui/material";
import { purple,cyan} from "@mui/material/colors";
export const DarkTheme = createTheme({
    palette:{
        mode:'dark',
        primary:{
            main:purple[700],
            dark:purple[800],
            light:purple[500],
            contrastText:'#ffffff',
        },
        secondary:{
            main:cyan[500],
            dark:cyan[400],
            light:cyan[300],
            contrastText:'#ffffff',
        },
        background:{
            default:'#303134',
            paper:'#3a3a3a',
        }
    },
    typography:{
        allVariants:{
            color:'#ffffff',
        }
    }
});