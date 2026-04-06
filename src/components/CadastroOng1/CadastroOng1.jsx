import Titulo from "../Titulo/Titulo.jsx";
import css from "./CadastroOng1.module.css"
import Input from "../Input/Input.jsx";
import BotaoAlternar from "../BotaoAlternar/BotaoAlternar.jsx";
import Botao from "../Botao/Botao.jsx";
import Select from "../Select/Select.jsx";

export default function CadastroOng1() {
    return(
        <section className={css.containerSection}>
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
                    <Botao texto={'Cadastre-se'} cor={'rosa'}/>
                </div>
            </div>
        </section>
    )
}