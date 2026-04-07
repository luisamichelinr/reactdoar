import css from './Login1.module.css'
import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function Login1() {
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    function alterarCPF(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setCpf(valor)
    }

    function alterarSenha(e) {
        setSenha(e.target.value)
    }

    async function realizarLogin() {
        let retorno = await fetch('http://192.168.18.157:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                cpf_cnpj: cpf,
                senha: senha,
            })
        })

        retorno = await retorno.json();

        console.log(retorno);

        if (retorno.token) {

            // SALVA NO BANCO DO JS
            localStorage.setItem('token', retorno.token);
            localStorage.setItem('nome', retorno.nome)

            navigate('/dashboard')


        } else {
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
                        <Titulo titulo={'Bem-vindo de volta!'} cor={'azul-claro'} />

                        <form className={css.formulario}>
                            <div className={css.campo}>
                                <Input
                                    label={"CPF/CNPJ"}
                                    type={"text"}
                                    input={cpf}
                                    alterarInput={alterarCPF}
                                    placeholder={"Digite seu CPF ou CNPJ"}
                                    required={true}
                                    maxLength={14}
                                />
                            </div>

                            <div className={css.campo}>
                                <Input
                                    alterarInput={alterarSenha}
                                    input={senha}
                                    label={"Senha"}
                                    type={"password"}
                                    placeholder={"Digite sua senha"}
                                    required={true}
                                />
                                <a href="/esqueciSenha" className={css.link}>Esqueci minha senha</a>
                            </div>

                            <div className={css.areaBotao}>
                                <Botao acao={realizarLogin}  cor={'amarelo'} texto={'Login'} />
                            </div>

                            <div className={css.cadastro}>
                                <p className={css.p}>Ainda não está no Doar+?</p>
                                <Botao pagina={'/cadastroDoador'} cor={'vazadoamarelo'} texto={'Cadastre-se'} />
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