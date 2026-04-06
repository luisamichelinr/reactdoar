import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Titulo from "../Titulo/Titulo.jsx";
import Input from "../Input/Input.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";
import css from "./CadastroAdm1.module.css";

const API_URL = 'http://10.92.3.128:5000';

export default function CadastroAdm1() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    // Estados para cada campo
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    async function realizarCadastro() {
        // Validações
        if (!nome) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Nome!' });
            return;
        }
        if (!cpf) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo CPF!' });
            return;
        }
        if (!senha) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Senha!' });
            return;
        }
        if (!email) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Email!' });
            return;
        }
        if (!telefone) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Telefone!' });
            return;
        }
        if (!confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'Preencha o campo Confirmar senha!' });
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'Senhas não conferem!' });
            return;
        }

        if (cpf.length !== 11) {
            setMensagem({ tipo: 'erro', texto: 'CPF deve ter 11 dígitos!' });
            return;
        }

        if (senha.length < 8) {
            setMensagem({ tipo: 'erro', texto: 'A senha deve ter pelo menos 8 caracteres!' });
            return;
        }

        setLoading(true);
        setMensagem({ tipo: '', texto: '' });

        try {
            const retorno = await fetch(`${API_URL}/criar_usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf_cnpj: cpf,
                    senha: senha,
                    confirmar_senha: confirmarSenha,
                    telefone: telefone,
                    email: email,
                    tipo: 0
                })
            });

            const data = await retorno.json();

            if (retorno.ok) {
                localStorage.setItem('emailConfirmacao', email);
                setMensagem({ tipo: 'sucesso', texto: 'Cadastro realizado com sucesso!' });
                setTimeout(() => {
                    navigate('/confirmarEmail');
                }, 2000);
            } else {
                setMensagem({ tipo: 'erro', texto: data.error || data.mensagem || 'Erro ao realizar cadastro!' });
            }
        } catch (error) {
            console.error('Erro:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor!' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={css.secao}>
            <Mensagem
                tipo={mensagem.tipo}
                texto={mensagem.texto}
                onClose={() => setMensagem({ tipo: '', texto: '' })}
            />

            <div className={css.organizar}>
                <Titulo titulo={'Cadastro de Administrador'} cor={'azul-claro'} />
            </div>

            <div className={css.formulario}>
                <div>
                    <Input
                        label={'Nome'}
                        type={'text'}
                        placeholder={'Digite seu nome'}
                        required={true}
                        input={nome}
                        alterarInput={(e) => setNome(e.target.value)}
                    />
                    <Input
                        label={'CPF'}
                        type={'text'}
                        placeholder={'Digite seu CPF'}
                        required={true}
                        maxLength={11}
                        soNumeros={true}
                        input={cpf}
                        alterarInput={(e) => setCpf(e.target.value)}
                    />
                    <Input
                        label={'Senha'}
                        type={'password'}
                        placeholder={'Digite sua senha'}
                        required={true}
                        input={senha}
                        alterarInput={(e) => setSenha(e.target.value)}
                    />
                </div>

                <div>
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'Digite seu email'}
                        required={true}
                        input={email}
                        alterarInput={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label={'Telefone'}
                        type={'text'}
                        placeholder={'Digite seu telefone'}
                        required={true}
                        maxLength={11}
                        soNumeros={true}
                        input={telefone}
                        alterarInput={(e) => setTelefone(e.target.value)}
                    />
                    <Input
                        label={'Confirmar senha'}
                        type={'password'}
                        placeholder={'Confirme sua senha'}
                        required={true}
                        input={confirmarSenha}
                        alterarInput={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>
            </div>

            <div className={css.botao}>
                <Botao
                    texto={loading ? 'Cadastrando...' : 'Cadastrar'}
                    cor={'rosa'}
                    acao={realizarCadastro}
                />
            </div>
        </section>
    );
}
