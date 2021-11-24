import { useEffect, useState } from "react";
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


const MateriasListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [materias, setMaterias] = useState([]);

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
    <Box sx={{ marginTop: "25px" }}>
      {materias.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Base de dados: Turma Teresópolis 008 </caption>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                {" "}
                Matérias Disciplinares{" "}
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Título
              </TableCell>
              <TableCell align="right" style={{ fontWeight: "bold" }}>
                Professor
              </TableCell>              
              <TableCell align="right" style={{ fontWeight: "bold" }}>
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
                <TableCell align="right">{materia.titulo}</TableCell>
                <TableCell align="right">{materia.professor_nome}</TableCell>
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
