import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Titulo from "../Titulo/Titulo.jsx";
import css from "./CadastroOng1.module.css";
import Input from "../Input/Input.jsx";
import BotaoAlternar from "../BotaoAlternar/BotaoAlternar.jsx";
import Botao from "../Botao/Botao.jsx";
import Select from "../Select/Select.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";

const API_URL = 'http://10.92.3.128:5000';

export default function CadastroOng1() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    const [nome, setNome] = useState('');
    const [descricaoBreve, setDescricaoBreve] = useState('');
    const [senha, setSenha] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [codBanco, setCodBanco] = useState('');
    const [numConta, setNumConta] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [descricaoLonga, setDescricaoLonga] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [categoria, setCategoria] = useState('');
    const [numAgencia, setNumAgencia] = useState('');
    const [tipoConta, setTipoConta] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    async function realizarCadastro() {
        // Validações
        if (!nome) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Nome!' });
            return;
        }
        if (!descricaoBreve) {
            setMensagem({ tipo: 'erro', texto: 'Preencha a Descrição breve!' });
            return;
        }
        if (!senha) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Senha!' });
            return;
        }
        if (!confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Confirmar senha!' });
            return;
        }
        if (!localizacao) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Localização!' });
            return;
        }
        if (!codBanco) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Código do banco!' });
            return;
        }
        if (!numConta) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Número da conta!' });
            return;
        }
        if (!cnpj) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo CNPJ!' });
            return;
        }
        if (!descricaoLonga) {
            setMensagem({ tipo: 'erro', texto: 'Preencha a Descrição longa!' });
            return;
        }
        if (!categoria) {
            setMensagem({ tipo: 'erro', texto: 'Selecione uma categoria!' });
            return;
        }
        if (!numAgencia) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Número da agência!' });
            return;
        }
        if (!tipoConta) {
            setMensagem({ tipo: 'erro', texto: 'Selecione o tipo de conta!' });
            return;
        }
        if (!fotoPerfil) {
            setMensagem({ tipo: 'erro', texto: 'Selecione uma foto de perfil!' });
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'Senhas não conferem!' });
            return;
        }

        if (senha.length < 8) {
            setMensagem({ tipo: 'erro', texto: 'A senha deve ter pelo menos 8 caracteres!' });
            return;
        }

        if (cnpj.length !== 14) {
            setMensagem({ tipo: 'erro', texto: 'CNPJ deve ter 14 dígitos!' });
            return;
        }

        if (descricaoLonga.length < 50) {
            setMensagem({ tipo: 'erro', texto: 'A descrição longa deve ter pelo menos 50 caracteres!' });
            return;
        }

        setLoading(true);
        setMensagem({ tipo: '', texto: '' });

        try {
            const fotoBase64 = await fileToBase64(fotoPerfil);

            // NÃO enviar telefone para ONG (deixar como None/null)
            const dadosJSON = {
                nome: nome,
                email: null,  // Email será gerado pela API
                cpf_cnpj: cnpj,
                telefone: null,  // Não enviar telefone
                descricao_breve: descricaoBreve,
                descricao_longa: descricaoLonga,
                cod_banco: codBanco,
                num_agencia: numAgencia,
                num_conta: numConta,
                tipo_conta: tipoConta,
                chave_pix: null,
                categoria: categoria,
                localizacao: localizacao,
                senha: senha,
                confirmar_senha: confirmarSenha,
                tipo: 2,
                foto_perfil: fotoBase64
            };

            console.log('Enviando dados da ONG:', dadosJSON);

            const retorno = await fetch(`${API_URL}/criar_usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosJSON)
            });

            const data = await retorno.json();
            console.log('Resposta:', data);

            if (retorno.ok) {
                setMensagem({ tipo: 'sucesso', texto: 'Cadastro da ONG realizado com sucesso! Aguarde aprovação.' });
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setMensagem({ tipo: 'erro', texto: data.error || data.mensagem || 'Erro ao realizar cadastro!' });
            }
        } catch (error) {
            console.error('Erro:', error);
            setMensagem({ tipo: 'erro', texto: `Erro: ${error.message}` });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={css.containerSection}>
            <Mensagem
                tipo={mensagem.tipo}
                texto={mensagem.texto}
                onClose={() => setMensagem({ tipo: '', texto: '' })}
            />

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
                            placeholder={'Digite o nome da ONG'}
                            required={true}
                            input={nome}
                            alterarInput={(e) => setNome(e.target.value)}
                        />
                        <Input
                            label={'Descrição breve'}
                            type={'text'}
                            placeholder={'Descrição breve sobre sua ONG (máximo 30 caracteres)'}
                            required={true}
                            maxLength={30}
                            input={descricaoBreve}
                            alterarInput={(e) => setDescricaoBreve(e.target.value)}
                        />
                        <Input
                            label={'Senha'}
                            type={'password'}
                            placeholder={'Crie uma senha (mínimo 8 caracteres)'}
                            required={true}
                            input={senha}
                            alterarInput={(e) => setSenha(e.target.value)}
                        />
                        <Input
                            label={'Localização'}
                            type={'text'}
                            placeholder={'Digite sua localização (cidade/estado)'}
                            required={true}
                            input={localizacao}
                            alterarInput={(e) => setLocalizacao(e.target.value)}
                        />
                        <Input
                            label={'Código do banco'}
                            type={'text'}
                            placeholder={'Digite o código do banco (3 dígitos)'}
                            required={true}
                            maxLength={3}
                            soNumeros={true}
                            input={codBanco}
                            alterarInput={(e) => setCodBanco(e.target.value)}
                        />
                        <Input
                            label={'Número da conta'}
                            type={'text'}
                            placeholder={'Digite o número da conta'}
                            required={true}
                            soNumeros={true}
                            maxLength={12}
                            input={numConta}
                            alterarInput={(e) => setNumConta(e.target.value)}
                        />
                        <Input
                            label={'CNPJ'}
                            type={'text'}
                            placeholder={'Digite o CNPJ (14 dígitos)'}
                            required={true}
                            maxLength={14}
                            soNumeros={true}
                            input={cnpj}
                            alterarInput={(e) => setCnpj(e.target.value)}
                        />
                    </div>

                    <div className={css.campos}>
                        <Input
                            tamanho={'Big'}
                            label={'Descrição longa'}
                            type={'text'}
                            placeholder={'Descrição detalhada sobre sua ONG (mínimo 50 caracteres)'}
                            required={true}
                            minLength={50}
                            maxLength={200}
                            input={descricaoLonga}
                            alterarInput={(e) => setDescricaoLonga(e.target.value)}
                        />
                        <Input
                            label={'Confirmar senha'}
                            type={'password'}
                            placeholder={'Confirme sua senha'}
                            required={true}
                            input={confirmarSenha}
                            alterarInput={(e) => setConfirmarSenha(e.target.value)}
                        />
                        <Select
                            label={'Categoria'}
                            options={['Animal', 'Escolar', 'Comida', 'Saúde', 'Meio Ambiente', 'Direitos Humanos', 'Cultura', 'Esporte', 'Outro']}
                            required={true}
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        />
                        <Input
                            label={'Número da agência'}
                            type={'text'}
                            placeholder={'Digite o número da sua agência'}
                            required={true}
                            soNumeros={true}
                            maxLength={5}
                            input={numAgencia}
                            alterarInput={(e) => setNumAgencia(e.target.value)}
                        />
                        <Select
                            label={'Tipo de conta'}
                            options={['Conta-corrente', 'Poupança', 'Conta salário', 'Conta digital', 'Conta PJ']}
                            required={true}
                            value={tipoConta}
                            onChange={(e) => setTipoConta(e.target.value)}
                        />
                        <Input
                            label={'Foto de perfil'}
                            type={'file'}
                            required={true}
                            alterarInput={(e) => setFotoPerfil(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className={css.botaoContainer}>
                    <Botao
                        texto={loading ? 'Cadastrando...' : 'Cadastre-se'}
                        cor={'rosa'}
                        acao={realizarCadastro}
                    />
                </div>
            </div>
        </section>
    );
}
