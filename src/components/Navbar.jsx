import * as React from "react";
//import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

/*const ButtonMenu = styled (IconButton)`
  backgroundColor:'lightslategrey',
  margin: ' auto', 
  marginRight: "50px";
`;*/

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1}}>      
      <AppBar position="static"> 
           
        <Toolbar>      
          <Link to="/">          
            <IconButton
         
            style={{backgroundColor:'lightslategrey',margin: ' auto', marginRight: "50px"}}
              color="inherit"
              aria-label="menu"
            >
              Alunos
            </IconButton>            
          </Link>
          <Link to="/cadastrar-alunos">
            <IconButton 
            style={{backgroundColor:'lightslategrey',margin: ' auto', marginRight: "50px"}}        
            color="inherit">
              Cadastro de Aluno
              </IconButton>
          </Link>
          <Link to="/materias">
            <IconButton
            style={{backgroundColor:'lightslategrey',margin: ' auto', marginRight: "50px", }}
            color="inherit">
              Matérias
              </IconButton>
          </Link>
          <Link to="/cadastrar-materias">
            <IconButton
          style={{backgroundColor:'lightslategrey',margin: ' auto', marginRight: "50px"}}      
            color="inherit">
              Cadastro de Matérias
              </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}