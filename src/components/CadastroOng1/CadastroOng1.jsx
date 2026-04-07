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
    const [email, setEmail] = useState('')
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

    const [error, setError] = useState('');
    const sucesso = localStorage.getItem('sucesso');
    const navigate = useNavigate();


    function alterarNome(e) {
        setNome(e.target.value)
    }

    function alterarEmail(e) {
        setEmail(e.target.value)
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
        let form = new FormData();
        form.append('nome', nome)
        form.append('cpf_cnpj', cnpj)
        form.append('email', email)
        form.append('senha', senha)
        form.append('confirmar_senha', confirmarSenha)
        form.append('tipo', 2) // Tipo 2 para ONG

        // Campos específicos da ONG
        form.append('descricao_breve', descBreve)
        form.append('descricao_longa', descLonga)
        form.append('localizacao', localizacao)
        form.append('categoria', categoria)
        form.append('cod_banco', codBanco)
        form.append('num_agencia', numAgencia)
        form.append('num_conta', numConta)
        form.append('tipo_conta', tipoConta)
        form.append('foto_perfil', fotoPerfil)

        let retorno = await fetch('http://10.92.3.125:5000/criar_usuarios', {
            method: 'POST',
            credentials: 'include',
            body: form
        })

        retorno = await retorno.json();


        if (retorno.message) {
            navigate('/ConfirmarEmail')
            localStorage.setItem("sucesso", retorno.message)
        }

        else {
            setError(retorno.error)
        }
    }

    return(
        <section className={css.containerSection}>
            <div>
                <Mensagem tipo={"sucesso"} texto={sucesso} onClose={() => {
                    localStorage.removeItem('sucesso');
                    setError('');
                }}/>
                <Mensagem tipo={"erro"} texto={error} onClose={() => setError('')}/>
            </div>
            <div className={css.cadastroOng1}>
                <Titulo titulo={'Venha fazer parte da mudança!'} cor={'laranja'}/>
                <BotaoAlternar ong={true}/>
            </div>
            <div className={css.formulario}>
                <div className={css.linha}>
                    <div className={css.campos}>
                        <Input
                            label={'Nome'}
                            type={'text'}
                            placeholder={'Digite seu nome'}
                            required={true}
                            input={nome}
                            alterarInput={alterarNome}
                        />
                        <Input
                            label={'Email'}
                            type={'text'}
                            placeholder={'Digite seu email'}
                            required={true}
                            input={email}
                            alterarInput={alterarEmail}
                        />
                        <Input
                            label={'Descrição breve'}
                            type={'text'}
                            placeholder={'Descrição breve sobre sua ONG'}
                            required={true}
                            maxLength={30}
                            input={descBreve}
                            alterarInput={alterarDescBreve}
                        />
                        <Input
                            label={'Localização'}
                            type={'text'}
                            placeholder={'Digite sua localização'}
                            required={true}
                            input={localizacao}
                            alterarInput={alterarLocalizacao}

                        />
                        <Input
                            label={'Senha'}
                            type={'password'}
                            placeholder={'Crie uma senha'}
                            required={true}
                            input={senha}
                            alterarInput={alterarSenha}
                        />
                        <Input
                            label={'Código do banco'}
                            type={'text'}
                            placeholder={'Digite o código do banco'}
                            required={true}
                            maxLength={3}
                            input={codBanco}
                            alterarInput={alterarCodBanco}
                        />
                        <Input
                            label={'Número da conta'}
                            type={'text'}
                            placeholder={'Digite o número da conta'}
                            required={true}
                            input={numConta}
                            alterarInput={alterarNumConta}
                            maxLength={12}
                        />
                        <Select
                            label={'Tipo de conta'}
                            options={['Escolha um tipo de conta', 'Conta-corrente', 'Poupança', 'Conta salário', 'Conta digital', 'Conta PJ']}
                            input={tipoConta}
                            alterarInput={alterarTipoConta}
                        />
                    </div>
                    <div className={css.campos}>
                        <Input
                            label={'CNPJ'}
                            type={'text'}
                            placeholder={'Digite o CNPJ'}
                            required={true}
                            maxLength={14}
                            input={cnpj}
                            alterarInput={alterarCNPJ}
                        />
                        <Select
                            label={'Categoria'}
                            input={categoria}
                            alterarInput={alterarCategoria}
                            options={['Escolha uma categoria', 'Animal', 'Escolar', 'Comida', 'Outro']}/>
                        <Input
                            tamanho={'Big'}
                            label={'Descrição longa'}
                            type={'text'}
                            placeholder={'Descrição longa sobre sua ONG'}
                            required={true}
                            minLength={50}
                            maxLength={200}
                            input={descLonga}
                            alterarInput={alterarDescLonga}
                        />
                        <Input
                            label={'Confirmar senha'}
                            type={'password'}
                            placeholder={'Confirme sua senha'}
                            required={true}
                            input={confirmarSenha}
                            alterarInput={alterarConfirmarSenha}
                        />
                        <Input
                            label={'Número da agência'}
                            type={'text'}
                            placeholder={'Digite o número da sua agência'}
                            required={true}
                            maxLength={5}
                            input={numAgencia}
                            alterarInput={alterarNumAgencia}
                        />
                        <Input
                            label={'Foto de perfil'}
                            type={'file'}
                            required={true}
                            tamanho={'Big'}
                            alterarInput={alterarFotoPerfil}
                        />
                    </div>
                </div>
                <div className={css.botaoContainer}>
                    <Botao acao={criarOng} texto={'Cadastre-se'} cor={'rosa'}/>
                </div>
            </div>
        </section>
    )
}
