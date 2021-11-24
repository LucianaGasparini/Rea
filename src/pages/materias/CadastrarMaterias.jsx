import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { API_MATERIAS_URL } from "../../constants";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const CadastrarMaterias = () => {
  const {id} = useParams();
  const MySwal = withReactContent(Swal);

  const valorInicial = id ?" ": null;
  const [titulo, setTitulo] = useState(valorInicial);
  const [professor_nome, setProfessor_nome] = useState(valorInicial);

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
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
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
  );
};

export default CadastrarMaterias;
