import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { API_MATERIAS_URL } from "../../constants";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import {TemaContext} from '../../context';
import {useContext, useEffect, useState } from "react";
import { style } from "@mui/system";
import { Container } from "@mui/material";

const CadastrarMaterias = () => {
  const {id} = useParams();
  const MySwal = withReactContent(Swal);

  const valorInicial = id ?" ": null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [professor_nome, setProfessor_nome] = useState(valorInicial);
  const {tema, setTema} = useContext(TemaContext);

  useEffect(() => {
    getAlunos ()
  }, []);

  const getAlunos = ()=> {
    axios.get(API_MATERIAS_URL).then((response)=> {
      response.data.forEach (materia => {
        if (materia.id == id){
          setTitulo(materia.titulo);
          setProfessor_nome(materia.professor_nome);
        }
      })
    });
  };
  const cadastrarMaterias = () => {
    if (id){
    axios
    .put (API_MATERIAS_URL, {
      id,
      titulo, 
      professor_nome
    }).then ((response) => {
      console.log(response);
      if (response.status === 204){
        MySwal.fire(<p>"Matéria editada."</p>);
        limparCampos();
      }
      }).catch (error => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
        })
      });
    } else {
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
      }).catch(error => {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error,
  })
});
    }
  };

  const limparCampos = () => {
    setTitulo("");
    setProfessor_nome("");
  };
  return (
    <Container sx = {{marginTop: "25px", width: "100%", backgroundColor: tema == 'dark' ? "#292727": "#f6f6f6"}}>
    <Box     
      component="form"
      sx={{
        "& > :not(style)": { m: 3, width: "25ch" }, backgroundColor: tema == 'dark' ? "#292727": "#f6f6f6", 
        color: tema == 'dark'?"#f6f6f6" : "#292727"
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

      <Button
       sx={{ width: "250px", height: "55px", fontWeight: "bold" }} 
        variant="contained"
        onClick={cadastrarMaterias}
      >
        {id? 'Editar' :'Cadastrar'}
      </Button>
    </Box>
    </Container>
  );
};

export default CadastrarMaterias;
