import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./styles";
import React, {useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ALUNOS_URL } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Lottie from "react-lottie";
import animationData from "../../lotties/78259-loading.json";
import {TemaContext, AlunoContext} from '../../context';
//import SimpleContainer from "../../components/MaxContainer";


const AlunosListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  //const [alunos, setAlunos] = useState([]);
  const {tema, setTema} = useContext(TemaContext);
  const {aluno, setAluno} = useContext(AlunoContext);

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = () => {
    axios.get(API_ALUNOS_URL).then((response) => {
      setTimeout(()=> {
      setAluno(response.data);
    }, 5000)
    });
  };

  const deletarAluno = (alunoDel) => {
    axios
      .delete(API_ALUNOS_URL, { data: alunoDel })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const alunoIndex = aluno.findIndex(
          (elemento) => elemento.id === alunoDel.id
        );
        let newAlunos = [...aluno];
        newAlunos.splice(alunoIndex, 1);
        setAluno(newAlunos);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };
const editarAluno = (aluno) =>{
navigate(`/editar-alunos/${aluno.id}`);
}
  return (  
    
    <Box sx={{ marginTop: "60px", backgroundColor: tema == 'dark' ? "#292727": "#d3c8c8", 
    color: tema == 'dark'?"#f6f6f6" : "#292727" }}>
      {aluno.length > 0?(
     
        <Table sx={{backgroundColor: tema == 'dark' ? "#292727": "#f6f6f6",
      color: tema == 'dark'?"#f6f6f6" : "#292727"}} 
      aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727"}}>Nome</StyledTableCell>
              <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727"}}>Idade</StyledTableCell>
              <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727" }}>Cidade</StyledTableCell>
              <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727" }} > Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aluno.map((alunoAtual) => (
              <StyledTableRow>
                <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727" }}>{alunoAtual.nome}</StyledTableCell>
                <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727" }}>{alunoAtual.idade}</StyledTableCell>
                <StyledTableCell sx={{color: tema == 'dark'?"#f6f6f6" : "#292727" }}>{alunoAtual.cidade}</StyledTableCell>
                <StyledTableCell>
                <Button onClick={() => editarAluno(alunoAtual)} variant="text">
                    <EditIcon />
                    </Button>
                  <Button onClick={() => deletarAluno(alunoAtual)} variant="text">
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
    
      ) :(
        <>        
        <Lottie options={defaultOptions} height={500} width={500} />
        </>
      )}
       </Box>
   
  );
};

export default AlunosListagem;
