import { useEffect, useState } from "react";
import axios from "axios";
import { API_MATERIAS_URL } from "../../constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Box from "@mui/material/Box";

const MateriasListagem = () => {
    const MySwal = withReactContent(Swal);
    const [materias, setMaterias] = useState([]);
  
    useEffect(() => {
      getMaterias();
    }, []);
  
    const getMaterias = () => {
      axios.get(API_MATERIAS_URL).then((response) => {
        setMaterias(response.data);
      });
    };
  
    const deletarMateria = (materia) => {
      axios
        .delete(API_MATERIAS_URL, { data: materia})
        .then((response) => {
          MySwal.fire(<p>{response?.data?.message}</p>);
          
          const materiaIndex = materias.findIndex(
            (disciplina) => disciplina.id === materia.id
          );
          let newMaterias = [ ...materias ];
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
    return(
      <Box sx={{ marginTop: "25px" }}>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Base de dados banco Yago</caption>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}} > Matérias Disciplinares </TableCell>
            <TableCell align="right" style={{fontWeight:"bold"}} >Título</TableCell>    
            <TableCell  align="right" style={{fontWeight:"bold"}} >Professor</TableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {materias.map((materia) => (
            <TableRow key={materia.titulo}>
              <TableCell component="th" scope="materias">
                {materias.titulo}
              </TableCell>
              <TableCell align="right">{materia.titulo}</TableCell>
              <TableCell align="right">{materia.professor_nome}</TableCell>  
              <Button onClick={() => deletarMateria(materia)} variant="text">
             <DeleteIcon />
           </Button>            
            </TableRow>            
          ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
    export default MateriasListagem;