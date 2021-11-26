import{ useContext } from "react";
import { TemaContext } from "../context/index";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export default function SimpleContainer({children}) {
  const {tema, setTema} = useContext(TemaContext);
  return (
    <React.Fragment>
      <CssBaseline />
     
        <Box sx={{ Width:'100%', bgcolor: '#b6d1e7', backgroundColor: tema == 'dark' ? "#4b4949": "#b6d1e7" }}
        >

        {children}
       </Box>
    
    </React.Fragment>
  );
}


export {SimpleContainer};
