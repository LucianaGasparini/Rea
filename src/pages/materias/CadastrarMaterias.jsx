import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { API_MATERIAS_URL } from "../../constants";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
//import { ButtonCadastro} from "../../components/Cadastros";
import { Button } from '@mui/material';

const CadastrarMaterias = () => {
    const MySwal = withReactContent(Swal);
  
    const [titulo, setTitulo] = useState();
    const [professor_nome, setProfessor_nome] = useState();
    
  
    const cadastrarMaterias = () => {
      axios
        .post(API_MATERIAS_URL, {
          titulo,
          professor_nome,
                  })
        .then((response) => {
          if (response.status === 201) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        });
    };
  
    const limparCampos = () => {
      setTitulo("");
      setProfessor_nome("");
      
    };
    return (
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField        
        label="Título da matéria"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
       
      />
      <TextField
       label="Nome do professor"
       value={professor_nome}
       onChange={(e) => setProfessor_nome(e.target.value)}
      />
      
      <Button  style={{width: "250px", height: "55px", fontWeight:"bold"}}variant="contained" onClick={cadastrarMaterias}>
        Cadastrar
      </Button>
    </Box>  );
}
      

export default CadastrarMaterias;