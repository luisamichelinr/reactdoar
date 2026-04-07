import Titulo from "../Titulo/Titulo.jsx";
import css from "./CadastroOng1.module.css"
import Input from "../Input/Input.jsx";
import BotaoAlternar from "../BotaoAlternar/BotaoAlternar.jsx";
import Botao from "../Botao/Botao.jsx";
import Select from "../Select/Select.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function CadastroOng1() {
    const [nome, setNome] = useState('')
    const [descBreve, setDescBreve] = useState('')
    const [descLonga, setDescLonga] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [codBanco, setCodBanco] = useState('')
    const [numAgencia, setNumAgencia] = useState('')
    const [numConta, setNumConta] = useState('')
    const [tipoConta, setTipoConta] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState('')
    const [cnpj, setCnpj] = useState('')

    const [error, setError] = useState('')
    const navigate = useNavigate();

    function alterarNome(e) {
        setNome(e.target.value)
    }

    function alterarDescBreve(e) {
        setDescBreve(e.target.value)
    }

    function alterarDescLonga(e) {
        setDescLonga(e.target.value)
    }

    function alterarLocalizacao(e) {
        setLocalizacao(e.target.value)
    }

    function alterarCategoria(e) {
        setCategoria(e.target.value)
    }

    function alterarTipoConta(e) {
        setTipoConta(e.target.value)
    }

    function alterarCNPJ(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setCnpj(valor)
    }

    function alterarCodBanco(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setCodBanco(valor)
    }

    function alterarNumAgencia(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setNumAgencia(valor)
    }

    function alterarNumConta(e) {
        let valor = e.currentTarget.value
        valor = valor.replace(/\D/g, '')

        setNumConta(valor)
    }

    function alterarEmail(e) {
        setEmail(e.currentTarget.value)
    }

    function alterarSenha(e) {
        setSenha(e.target.value)
    }

    function alterarConfirmarSenha(e) {
        setConfirmarSenha(e.target.value)
    }

    function alterarFotoPerfil(e) {
        setFotoPerfil(e.target.files[0])
    }



    async function criarOng() {
        const form = new FormData();
        form.append('nome', nome)
        form.append('cpf_cnpj', cpf)
        form.append('telefone', telefone)
        form.append('email', email)
        form.append('senha', senha)
        form.append('confirmar_senha', confirmarSenha)
        form.append('tipo', 0)

        let retorno = await fetch('http://192.168.18.157:5000/criar_usuarios', {
            method: 'POST',
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

    return(
        <section className={css.containerSection}>
            <div>
                <Mensagem tipo={"erro"} texto={error} />
            </div>
            <div className={css.cadastroOng1}>
                <Titulo titulo={'Venha fazer parte da mudança!'} cor={'laranja'}/>
                <BotaoAlternar ong={true}/>
            </div>
            <div className={css.formulario}>
                <div className={css.linha}>
                    <div className={css.campos}>
                        <Input label={'Nome'} type={'text'} placeholder={'Digite seu nome'} required={true}/>
                        <Input label={'Descrição breve'} type={'text'} placeholder={'Descrição breve sobre sua ONG'} required={true} maxLength={30}/>
                        <Input label={'Senha'} type={'password'} placeholder={'Crie uma senha'} required={true}/>
                        <Input label={'Localização'} type={'text'} placeholder={'Digite sua localização'} required={true}/>
                        <Input label={'Código do banco'} type={'text'} placeholder={'Digite o código do banco'} required={true} maxLength={3} soNumeros={true}/>
                        <Input label={'Número da conta'} type={'text'} placeholder={'Digite o número da conta'} required={true} soNumeros={true}/>
                        <Input label={'CNPJ'} type={'text'} placeholder={'Digite o CNPJ'} required={true} maxLength={14} soNumeros={true}/>
                    </div>
                    <div className={css.campos}>
                        <Input tamanho={'Big'} label={'Descrição longa'} type={'text'} placeholder={'Descrição longa sobre sua ONG'} required={true} minLength={50} maxLength={200}/>
                        <Input label={'Confirmar senha'} type={'password'} placeholder={'Confirme sua senha'} required={true}/>
                        <Select label={'Categoria'} options={['Escolha uma categoria', 'Animal', 'Escolar', 'Comida', 'Outro']}/>
                        <Input label={'Número da agência'} type={'text'} placeholder={'Digite o número da sua agência'} required={true} soNumeros={true}/>
                        <Select label={'Tipo de conta'} options={['Escolha um tipo de conta', 'Conta-corrente', 'Poupança', 'Conta salário', 'Conta digital', 'Conta PJ']}/>
                        <Input label={'Foto de perfil'} type={'file'} required={true}/>
                    </div>
                </div>
                <div className={css.botaoContainer}>
                    <Botao acao={criarOng} texto={'Cadastre-se'} cor={'rosa'}/>
                </div>
            </div>
        </section>
    )
}