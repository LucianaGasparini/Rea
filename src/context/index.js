import React, {createContext, useState} from 'react';

export const TemaContext = createContext();

export function TemaProvider ({children}){
    // light ou dark
    const [tema, setTema] = useState('light'); 
    return(
        <TemaContext.Provider 
            value={{tema, setTema,}}
        >
        {children}
        </TemaContext.Provider>
    )};

    
    export const AlunoContext = createContext();

    export function AlunoProvider ({children}){
        // light ou dark
        const [aluno, setAluno] = useState([]); 
        return(
            <AlunoContext.Provider 
                value={{aluno, setAluno,
    
                }}
            >
            {children}
            </AlunoContext.Provider>
        )};

      /*  export const UsuarioContext = createContext();
        export const UsuarioProvider = ({children}) =>{
            const [usuario, setUsuario]= useState(
                "Usuário"
            )
            return (
                <UsuarioContext.Provider
                value={{
                    usuario,
                    setUsuario,
                }}
                >
                    {children}
                </UsuarioContext.Provider>         
            );
        };*/