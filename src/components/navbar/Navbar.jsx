import React, {useState, useContext} from "react";
//import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { TemaContext, UsuarioContext } from "../../context";
import { ThemeWrapper, MaterialUISwitch } from "./styles";


/*const ButtonMenu = styled (IconButton)`
  backgroundColor:'lightslategrey',
  margin: ' auto', 
  marginRight: "50px";
`;*/

export default function ButtonAppBar() {
  //contexto usa chaves cuidado para não confundir com estado do useState que usa []
  const {tema, setTema} = useContext(TemaContext);
  const [switchTema, setSwitchTema] = useState(false);

// setTema('light');

  function mudouSwitch(){
    tema == 'light' ? setTema('dark'): setTema('light')
    setSwitchTema(!switchTema)
    console.log(tema)
  }
 
  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="fixed" sx = {{backgroundColor: tema == 'dark' ? "#292727": "#1976d2"}}>
        <Toolbar>
          <Link to="/">
            <IconButton                      
              sx={{
                backgroundColor: "lightslategrey",
                margin: " auto",
                marginRight: "50px",
              }}
              color="inherit"
              aria-label="menu"
            >
              Alunos             
            </IconButton>
          </Link>
          <Link to="/cadastrar-alunos">
            <IconButton
              sx={{
                backgroundColor: "lightslategrey",
                margin: " auto",
                marginRight: "50px",
              }}
              color="inherit"
            >
              Cadastro de Aluno
            </IconButton>
          </Link>
          <Link to="/materias">
            <IconButton
              sx={{
                backgroundColor: "lightslategrey",
                margin: " auto",
                marginRight: "50px",
              }}
              color="inherit"
            >
              Matérias
            </IconButton>
          </Link>
          <Link to="/cadastrar-materias">
            <IconButton
              sx={{
                backgroundColor: "lightslategrey",
                margin: " auto",
                marginRight: "50px",
              }}
              color="inherit"
            >
              Cadastro de Matérias
            </IconButton>
          </Link>
          <ThemeWrapper >
            <MaterialUISwitch value={switchTema} onChange={mudouSwitch}/>           

           </ ThemeWrapper >
        </Toolbar>
      </AppBar>
    </Box>
  );
}
