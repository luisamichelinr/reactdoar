import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import css from "./RedefinirSenha1.module.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function RedefinirSenha1() {
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const id = localStorage.getItem("id");


    function alterarSenha(e) {
        setSenha(e.currentTarget.value)
    }

    function alterarConfirmarSenha(e) {
        setConfirmarSenha(e.currentTarget.value)
    }

    async function redefinirSenha() {
        const form = new FormData();
        form.append('senha', senha);
        form.append('confirmar_senha', confirmarSenha);
        form.append('token', localStorage.getItem("token"));

        let retorno = await fetch('http://10.92.3.127:5000/editar_usuarios/' + id, {
        method: 'PUT',
            credentials: 'include',
            body: form
    })

    retorno = await retorno.json();

    if (retorno.message) {
        navigate('/login')
    }

    else {
        setError(retorno.error)
    }
}

return (
    <div className={"container-fluid " + css.secao}>
        <div>
            <Mensagem tipo={"erro"} texto={error} />
        </div>
        <div className="row g-0">
            <div className={"col-md-6 col-md-6 " + css.colunaFormulario}>
                <div className={css.conteudoFormulario}>
                    <Titulo titulo={'Redefinir senha'} cor={'azul-claro'} texto={'Digite a nova senha abaixo'}/>

                    <form className={css.formulario}>
                        <div className={css.campo}>
                            <Input
                                label={"Nova senha"}
                                type={"password"}
                                placeholder={"Digite sua nova senha"}
                                required={true}
                                input={senha}
                                alterarInput={alterarSenha}
                            />
                        </div>

                        <div className={css.campo}>
                            <Input
                                label={"Confirme sua nova senha"}
                                type={"password"}
                                placeholder={"Confirme sua nova senha"}
                                required={true}
                                input={confirmarSenha}
                                alterarInput={alterarConfirmarSenha}
                            />
                        </div>

                        <div className={css.areaBotao}>
                            <Botao acao={redefinirSenha} cor={'amarelo'} texto={'Alterar senha'} />
                        </div>

                    </form>
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