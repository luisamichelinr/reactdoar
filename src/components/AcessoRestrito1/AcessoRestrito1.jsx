import Titulo from "../Titulo/Titulo.jsx";
import css from "./AcessoRestrito1.module.css"
import Botao from "../Botao/Botao.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function AcessoRestrito1() {
    const navigate = useNavigate();
    const nome = localStorage.getItem('nome');
    const [error, setError] = useState('');
    const [sucesso, setSucesso] = useState(localStorage.getItem('sucesso')); // Usar estado

    async function Logout() {
        const token = localStorage.getItem('token');
        await fetch('http://10.92.3.146:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        });

        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        localStorage.setItem('sucesso', 'Usuário deslogado com sucesso!');

        navigate("/login");
    }

    useEffect(function () {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
    }, [])


    const fecharMensagemSucesso = () => {
        localStorage.removeItem('sucesso');
        setSucesso(null);
    }


    const fecharMensagemErro = () => {
        setError('');
    }

    return (
        <div className={css.inicio}>
            <div>
                <Mensagem
                    tipo={"sucesso"}
                    texto={sucesso}
                    onClose={fecharMensagemSucesso}
                />
                <Mensagem
                    tipo={"erro"}
                    texto={error}
                    onClose={fecharMensagemErro}
                />
            </div>
            <Titulo titulo={'Olá, ' + nome} cor={'azul-claro'} texto={'Essa página é restrita, sendo somente acessada com validação'}/>
            <div>
                <Botao texto={'Logout'} cor={'vermelho'} acao={Logout}/>
            </div>
        </div>
    )
}
