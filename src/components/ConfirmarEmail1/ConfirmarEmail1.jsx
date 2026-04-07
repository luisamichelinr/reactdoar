import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ConfirmarEmail1.module.css';
import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";

const API_URL = ' http://10.92.3.128:5000';

export default function ConfirmarEmail1() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('email');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    // Carrega o email salvo do cadastro
    useEffect(() => {
        const savedEmail = localStorage.getItem('emailConfirmacao');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    // Função para enviar o código por email
    async function handleEnviarCodigo() {
        if (!email) {
            setMensagem({ tipo: 'erro', texto: 'Por favor, informe seu e-mail' });
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setMensagem({ tipo: 'erro', texto: 'Digite um e-mail válido!' });
            return;
        }

        setLoading(true);
        setMensagem({ tipo: '', texto: '' });

        try {
            const retorno = await fetch(`${API_URL}/esqueci_senha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const data = await retorno.json();

            if (retorno.ok) {
                setMensagem({ tipo: 'sucesso', texto: 'Código de confirmação enviado para seu e-mail!' });
                setStep('codigo');
            } else {
                setMensagem({ tipo: 'erro', texto: data.mensagem || data.error || 'Erro ao enviar código' });
            }
        } catch (error) {
            console.error('Erro:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor!' });
        } finally {
            setLoading(false);
        }
    }

    // Função para confirmar o código digitado
    async function handleConfirmarCodigo() {
        if (!codigo) {
            setMensagem({ tipo: 'erro', texto: 'Digite o código de confirmação' });
            return;
        }

        if (codigo.length !== 6) {
            setMensagem({ tipo: 'erro', texto: 'O código deve ter 6 dígitos' });
            return;
        }

        setLoading(true);
        setMensagem({ tipo: '', texto: '' });

        try {
            const retorno = await fetch(`${API_URL}/confirmar_email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo_digitado: codigo })
            });

            const data = await retorno.json();

            if (retorno.ok) {
                setMensagem({ tipo: 'sucesso', texto: 'E-mail confirmado com sucesso! Redirecionando para o login...' });
                localStorage.removeItem('emailConfirmacao');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMensagem({ tipo: 'erro', texto: data.error || data.message || 'Código incorreto!' });
            }
        } catch (error) {
            console.error('Erro:', error);
            setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor!' });
        } finally {
            setLoading(false);
        }
    }

    function handleVoltarLogin() {
        navigate('/login');
    }

    return (
        <div className={"container-fluid " + css.secao}>
            <Mensagem
                tipo={mensagem.tipo}
                texto={mensagem.texto}
                onClose={() => setMensagem({ tipo: '', texto: '' })}
            />

            <div className="row">
                <div className={"col-md-7 " + css.padding}>
                    {step === 'email' ? (
                        <>
                            <Titulo
                                titulo={'Confirmar E-mail'}
                                cor={'azul-claro'}
                                texto={'Informe o e-mail cadastrado para receber o código de confirmação.'}
                            />
                            <div className={"d-flex flex-column align-items-start justify-content-center gap-5"}>
                                <div className={"d-flex flex-column align-items-center justify-content-center gap-4"}>
                                    <div className={"d-flex flex-column align-items-start justify-content-center gap-3 " + css.width}>
                                        <Input
                                            label={"E-mail"}
                                            type={"email"}
                                            placeholder={"Digite seu e-mail"}
                                            required={true}
                                            input={email}
                                            alterarInput={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className={"d-flex align-items-end justify-content-center gap-5"}>
                                        <Botao
                                            cor={'amarelo'}
                                            texto={loading ? 'Enviando...' : 'Enviar código'}
                                            acao={handleEnviarCodigo}
                                        />
                                        <Botao
                                            cor={'vazadoamarelo'}
                                            texto={'Voltar ao login'}
                                            acao={handleVoltarLogin}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Titulo
                                titulo={'Digite o código de confirmação'}
                                cor={'azul-claro'}
                                texto={`Enviamos um código de 6 dígitos para o e-mail: ${email}`}
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
                                            soNumeros={true}
                                            input={codigo}
                                            alterarInput={(e) => setCodigo(e.target.value)}
                                        />
                                    </div>

                                    <div className={"d-flex align-items-end justify-content-center gap-5"}>
                                        <Botao
                                            cor={'amarelo'}
                                            texto={loading ? 'Confirmando...' : 'Confirmar e-mail'}
                                            acao={handleConfirmarCodigo}
                                        />
                                        <Botao
                                            cor={'vazadoamarelo'}
                                            texto={'Voltar'}
                                            acao={() => setStep('email')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={"col-5 d-flex justify-content-end"}>
                    <img className={css.imagem} src='/cachorro_macaco.png' alt="Cachorro com um macaco de pelúcia"/>
                </div>
            </div>
        </div>
    );
}