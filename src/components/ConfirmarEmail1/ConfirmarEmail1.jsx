import { useNavigate } from 'react-router-dom';
import css from './ConfirmarEmail1.module.css';
import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";
import {useState} from "react";


const API_URL = ' http://10.92.3.125:5000';

export default function ConfirmarEmail1() {
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const sucesso = localStorage.getItem('sucesso');
    const navigate = useNavigate();

    

    function alterarCodigo(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')
        setCodigo(valor)
    }

    // Função para confirmar o código digitado
    async function verificarCodigoEmail() {
        let retorno = await fetch(`${API_URL}/confirmar_email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigo_digitado: codigo
                })
            });

        retorno = await retorno.json();

        if (retorno.message) {
            navigate('/login');
            localStorage.setItem('sucesso', retorno.message)
        }
        else {
            setError(retorno.error)
        }
    }

    return (
        <div className={"container-fluid " + css.secao}>
            <div>
                <Mensagem tipo={"sucesso"} texto={sucesso} onClose={() => {
                    localStorage.removeItem('sucesso');
                    setError('');
                }}/>
                <Mensagem tipo={"erro"} texto={error} onClose={() => setError('')}/>
            </div>

            <div className="row">
                <div className={"col-md-7 " + css.padding}>
                    <>
                            <Titulo
                                titulo={'Digite o código de confirmação'}
                                cor={'azul-claro'}
                                texto={`Enviamos um código de 6 dígitos para o e-mail cadastrado`}
                            />
                            <div className={"d-flex flex-column align-items-start justify-content-center gap-5"}>
                                <div className={"d-flex flex-column align-items-center justify-content-center gap-4"}>
                                    <div className={"d-flex flex-column align-items-start justify-content-center gap-3 " + css.width}>
                                        <Input
                                            label={"Código de confirmação"}
                                            type={"text"}
                                            placeholder={"Digite o código de 6 dígitos"}
                                            required={true}
                                            maxLength={6}
                                            input={codigo}
                                            alterarInput={alterarCodigo}
                                        />
                                    </div>

                                    <div className={"d-flex align-items-end justify-content-center gap-5"}>
                                        <Botao
                                            cor={'amarelo'}
                                            texto={'Confirmar e-mail'}
                                            acao={verificarCodigoEmail}
                                        />
                                        <Botao
                                            cor={'vazadoamarelo'}
                                            texto={'Voltar'}
                                            pagina={'/login'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                </div>
                <div className={"col-5 d-flex justify-content-end"}>
                    <img className={css.imagem} src='/cachorro_macaco.png' alt="Cachorro com um macaco de pelúcia"/>
                </div>
            </div>
        </div>
    );
}
