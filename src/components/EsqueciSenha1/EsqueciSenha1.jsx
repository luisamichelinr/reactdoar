import css from './EsqueciSenha1.module.css'
import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Mensagem from "../Mensagem/Mensagem.jsx";


export default function EsqueciSenha() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const sucesso = localStorage.getItem('sucesso');
    const navigate = useNavigate();

    if (sucesso) {
        localStorage.removeItem('sucesso');
    }

    function alterarEmail(e) {
        setEmail(e.target.value)
    }

    async function esqueciSenha() {
        let retorno = await fetch('http://10.92.3.125:5000/esqueci_senha', {
        method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
            body: JSON.stringify({
            email: email,
        })
    })

    retorno = await retorno.json();

    if (retorno.message) {
        navigate('/verificarCodigo')
        localStorage.setItem('sucesso', retorno.message)
    }

    else {
        setError(retorno.error)
    }
}


return (
    <div className={"container-fluid" + css.secao}>
        <div>
            <Mensagem tipo={"sucesso"} texto={sucesso} onClose={() => setError('')}/>
            <Mensagem tipo={"erro"} texto={error} onClose={() => setError('')}/>
        </div>
        <div className="row">
            <div className={"col-md-7 " + css.padding}>
                <Titulo titulo={'Enviar código para e-mail'} cor={'azul-claro'} texto={'Informe o e-mail cadastrado para receber o código de recuperação.'}/>
                <div className={"d-flex flex-column align-items-start justify-content-center gap-5"}>
                    <form className={"d-flex flex-column align-items-center justify-content-center gap-4"}>
                        <div className={"d-flex flex-column align-items-start justify-content-center gap-3 " + css.width}>
                            <Input
                                label={"E-mail"}
                                type={"email"}
                                placeholder={"Digite seu e-mail"}
                                required={true}
                                input={email}
                                alterarInput={alterarEmail}
                            />

                        </div>

                        <div className={"d-flex align-items-end justify-content-center gap-5 "}>
                            <Botao acao={esqueciSenha} cor={'amarelo'} texto={'Enviar e-mail'} />

                            <Botao cor={'vazadoamarelo'} texto={'Voltar ao login'} pagina={'/login'}/>
                        </div>


                    </form>
                </div>
            </div>
            <div className={"col-5 d-flex justify-content-end"}>
                <img className={css.imagem} src='/cachorro_macaco.png' alt="Cachorro com um macaco de pelúcia"/>
            </div>
        </div>
    </div>

)
}
