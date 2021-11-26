import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  ButtonCadastro,
  Form,
  InputCadastro,
} from "../../components/Cadastros";
import { API_ALUNOS_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";
//import AlunosListagem from "./AlunosListagem";
import { TemaContext, AlunoContext } from "../../context";
import Box from "@mui/material/Box";
import Lottie from "react-lottie";
import animationData from "../../lottiesEdit/9329-loading.json";
import { lottiesAlunos } from "./LottiesAlunos"


const CadastrarAlunos = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const { aluno, setAluno } = useContext(AlunoContext);
  const { tema, setTema } = useContext(TemaContext);

  const valorInicial = id ? " " : null;
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

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

  // const getAlunos = ()=> {
  //   axios.get(API_ALUNOS_URL).then((response) => {
  //     response.data.forEach(aluno =>{
  //       if(aluno.id == id){
  //         setNome(aluno.nome);
  //         setIdade(aluno.idade);
  //         setCidade(aluno.cidade);
  //       }
  //     })
  //     });
  //   };

  const procurarNaLista = () => {
    aluno.forEach((aluno) => {
      if (aluno.id == id) {
        setNome(aluno.nome);
        setIdade(aluno.idade);
        setCidade(aluno.cidade);
      }
    });
  };
  const getAlunos = () => {
    if (aluno.length > 0) {
      procurarNaLista(aluno);
    } else {
      axios.get(API_ALUNOS_URL).then((response) => {
        setTimeout(() => {
          setAluno(response.data);
          procurarNaLista(response.data);
        }, 5000);
      });
    }
  };

  const carregarAlunos = () => {
    axios.get(API_ALUNOS_URL).then((response) => {
      setAluno(response.data);
    });
  };

  const cadastrarAlunos = () => {
    if (id) {
      axios
        .put(API_ALUNOS_URL, {
          id,
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    } else {
      axios
        .post(API_ALUNOS_URL, {
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          if (response.status === 201) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    }
  };

  const limparCampos = () => {
    setNome("");
    setIdade("");
    setCidade("");
  };

  return (
    <Box
      sx={{
        marginTop: "60px",
        height: "100",
        backgroundColor: tema == "dark" ? "#292727" : "#f6f6f6",
        color: tema == "dark" ? "#f6f6f6" : "#292727",
      }}
    >
      {aluno.length > 0 ? (
        <Form>
          <InputCadastro
            sx={{ color: tema == "dark" ? "#f6f6f6" : "#292727" }}
            label="Nome"
            variant="outlined"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <InputCadastro
            label="Idade"
            variant="outlined"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
          <InputCadastro
            label="Cidade"
            variant="outlined"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <ButtonCadastro variant="contained" onClick={cadastrarAlunos}>
            {id ? "Editar" : "Cadastrar"}
          </ButtonCadastro>
        </Form>
      ) : (
        <>
          <Lottie options={defaultOptions} height={300} width={300} />
        </>        
      )}
      <div>
        <Lottie 
          options={lottiesAlunos}
          height={300}
          width={300}
        />
      </div>
    </Box>
  );
};

export default CadastrarAlunos;
