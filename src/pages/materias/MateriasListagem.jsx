import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_MATERIAS_URL } from "../../constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Lottie from 'react-lottie';
import animationData from '../../lottiesmat/9914-loading-success-fail-spinner-stroke-update.json'
import {TemaContext} from '../../context';

const MateriasListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [materias, setMaterias] = useState([]);
  const {tema, setTema} = useContext(TemaContext);


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_MATERIAS_URL).then((response) => {
      setTimeout (() => {
      setMaterias(response.data);
      }, 7000)
    });
  };

  const deletarMateria = (materia) => {
    axios
      .delete(API_MATERIAS_URL, { data: materia })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);

        const materiaIndex = materias.findIndex(
          (disciplina) => disciplina.id === materia.id
        );
        let newMaterias = [...materias];
        newMaterias.splice(materiaIndex, 1);
        setMaterias(newMaterias);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  const editarMateria = (materia)=> {
    navigate (`/editar-materias/${materia.id}`);
  }
  return (
    <Box sx={{ marginTop: "25px", backgroundColor: tema == 'dark' ? "#292727": "#f6f6f6"}}>
      {materias.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: tema == 'dark' ? "#292727": "#f6f6f6"
     }} aria-label="caption table">
          <caption >Base de dados: Turma Teresópolis 008 </caption>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: tema == 'dark'?"#f6f6f6" : "#292727"}}>
                
                Matérias Disciplinares
              </TableCell>
              <TableCell align="right"sx={{ fontWeight: "bold", color: tema == 'dark'?"#f6f6f6" : "#292727"}} >
                Título
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: tema == 'dark'?"#f6f6f6" : "#292727"}} >
                Professor
              </TableCell>             
              <TableCell align="right" sx={{fontWeight: "bold",  color: tema == 'dark'?"#f6f6f6" : "#292727"}}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <TableRow key={materia.titulo}>
                <TableCell component="th" scope="materias">
                  {materias.titulo}
                </TableCell>
                <TableCell align="right"sx={{ color: tema == 'dark'?"#f6f6f6" : "#292727"}}>{materia.titulo}</TableCell>
                <TableCell align="right"sx={{ color: tema == 'dark'?"#f6f6f6" : "#292727"}}>{materia.professor_nome}</TableCell>
                <Button onClick={() => editarMateria(materia)} variant="text">
                  <EditIcon />
                  </Button>
                <Button onClick={() => deletarMateria(materia)} variant="text">
                  <DeleteIcon />
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) : (
        <>
         <Lottie options={defaultOptions} height={500} width={500} />
         </>
      )}
    </Box>
  );
};
export default MateriasListagem;
