import axios from "axios";
import { useEffect, useState } from "react";
import {
  ButtonCadastro,
  Form,
  InputCadastro,
} from "../../components/Cadastros";
import { API_ALUNOS_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";



const CadastrarAlunos = () => {
  const {id} = useParams();  
  const MySwal = withReactContent(Swal);

  const valorInicial = id ? " " : null;
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

  useEffect(() => {
     getAlunos()
  }, []);

const getAlunos = ()=> {
  axios.get(API_ALUNOS_URL).then((response) => {
    response.data.forEach(aluno =>{
      if(aluno.id == id){
        setNome(aluno.nome);
        setIdade(aluno.idade);
        setCidade(aluno.cidade);
      }
    })
    });
  };

  const cadastrarAlunos = () => {
    if (id) {
      axios.put(API_ALUNOS_URL, {
        id,
        nome,
        idade, 
        cidade
      }).then((response)=>{
        console.log(response);
        if (response.status === 200){
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
    } else{ 
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
    setNome("");
    setIdade("");
    setCidade("");
  };

  return (
    <Form>
      <InputCadastro
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
       {id?'Editar': 'Cadastrar'}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarAlunos;
