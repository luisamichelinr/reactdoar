import Titulo from "../Titulo/Titulo.jsx";
import Input from "../Input/Input.jsx";
import Botao from "../Botao/Botao.jsx";
import css from "./CadastroAdm1.module.css";

export default function CadastroAdm1() {
    return (
        <section className={css.secao}>
            <div className={css.organizar}>
                <Titulo titulo={'Cadastro de Administrador'} cor={'azul-claro'} />
            </div>

            <div className={css.formulario}>
                <div>
                    <Input label={'Nome'} type={'text'} placeholder={'Digite seu nome'} required={true} />
                    <Input label={'CPF'} type={'text'} placeholder={'Digite seu CPF'} required={true} />
                    <Input label={'Senha'} type={'password'} placeholder={'Digite sua senha'} required={true} />
                </div>

                <div>
                    <Input label={'Email'} type={'text'} placeholder={'Digite seu email'} required={true} />
                    <Input label={'Telefone'} type={'text'} placeholder={'Digite seu telefone'} required={true} />
                    <Input label={'Confirmar senha'} type={'password'} placeholder={'Confirme sua senha'} required={true} />
                </div>
            </div>

            <div className={css.botao}>
                <Botao texto={'Cadastrar'} cor={'rosa'} />
            </div>
        </section>
    );
}