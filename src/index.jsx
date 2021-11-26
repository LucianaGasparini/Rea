import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import AlunosListagem from "./pages/alunos/AlunosListagem";
import Navbar from "./components/navbar/Navbar";
import Container from "@mui/material/Container";
import CadastrarAlunos from "./pages/alunos/CadastrarAlunos";
import MateriasListagem from "./pages/materias/MateriasListagem";
import CadastrarMaterias from "./pages/materias/CadastrarMaterias";
import { TemaProvider, AlunoProvider } from "./context";
import {SimpleContainer } from "./components/MaxContainer";

const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <AlunosListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id", element: <CadastrarAlunos /> },
    { path: "/materias", element: <MateriasListagem /> },
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
    { path: "/editar-materias/:id", element: <CadastrarMaterias /> },
  ]);

  return routes;
};

ReactDOM.render(
  <React.StrictMode>
    <TemaProvider> 
      <SimpleContainer >  
        <AlunoProvider>
          <BrowserRouter>
            <Navbar />
            
            <Container maxWidth="md">
              <Routes />
            </Container>
          </BrowserRouter>
        </AlunoProvider> 
        </SimpleContainer >      
        </TemaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
