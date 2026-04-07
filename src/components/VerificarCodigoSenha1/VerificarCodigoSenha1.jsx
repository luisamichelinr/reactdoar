import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import css from "./VerificarCodigoSenha1.module.css"
import {useNavigate} from "react-router-dom";
import Mensagem from "../Mensagem/Mensagem.jsx";
import {useState} from "react";

export default function VerificarCodigoSenha1() {
    const [codigo, setCodigo] = useState('')
    const [error, setError] = useState('');
    const sucesso = localStorage.getItem('sucesso');
    const navigate = useNavigate();

    if (sucesso) {
        localStorage.removeItem('sucesso');
    }


    function alterarCodigo(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setCodigo(valor)
    }

    async function verificarCodigoSenha() {
        let retorno = await fetch('http://10.92.3.125:5000/verificar_codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                codigo_digitado: codigo
            })
        })

        retorno = await retorno.json();

        if (retorno.message) {
            localStorage.setItem("id", retorno.id)
            localStorage.setItem("token", retorno.token)
            navigate('/redefinirSenha')
            localStorage.setItem('sucesso', retorno.message)
        }

        else {
            setError(retorno.error)
        }
    }

    return (
        <div className={"container-fluid " + css.secao}>
            <div>
                <Mensagem tipo={"sucesso"} texto={sucesso} onClose={() => setError('')}/>
                <Mensagem tipo={"erro"} texto={error} onClose={() => setError('')}/>
            </div>
            <div className="row g-0">
                <div className={"col-md-6 col-md-6 " + css.colunaFormulario}>
                    <div className={css.conteudoFormulario}>
                        <Titulo titulo={'Verificação de código'} cor={'azul-claro'} texto={'Enviamos um código de 6 dígitos para o seu e-mail.'}/>

                        <form className={css.formulario}>
                            <div className={css.campo}>
                                <Input
                                    label={"Digite o código"}
                                    type={"text"}
                                    placeholder={"Digite o código enviado por e-mail"}
                                    required={true}
                                    input={codigo}
                                    alterarInput={alterarCodigo}
                                    maxLength={6}
                                />
                            </div>

                        </form>
                        <div className={"d-flex align-items-end justify-content-center gap-5 " + css.areaBotao}>
                            <Botao acao={verificarCodigoSenha} cor={'amarelo'} texto={'Verificar código'} />
                            <Botao pagina={"/esquecisenha"} cor={'vazadoamarelo'} texto={'Mudar e-mail'} />

                        </div>
                    </div>
                </div>

                <div className={"col-md-6 " + css.colunaImagem}>
                    <img
                        className={css.imagem}
                        src="/cachorro_macaco.png"
                        alt="Cachorro com um macaco de pelúcia"
                    />
                </div>
            </div>
        </div>
    )
}