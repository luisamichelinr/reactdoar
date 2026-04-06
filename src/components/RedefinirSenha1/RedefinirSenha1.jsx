import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import css from "./RedefinirSenha1.module.css"

export default function RedefinirSenha1() {

    return (
        <div className={"container-fluid " + css.secao}>
            <div className="row g-0">
                <div className={"col-md-6 col-md-6 " + css.colunaFormulario}>
                    <div className={css.conteudoFormulario}>
                        <Titulo titulo={'Redefinir senha'} cor={'azul-claro'} texto={'Digite a nova senha abaixo'}/>

                        <form className={css.formulario}>
                            <div className={css.campo}>
                                <Input
                                    label={"Nova senha"}
                                    type={"password"}
                                    placeholder={"Digite sua nova senha"}
                                    required={true}
                                />
                            </div>

                            <div className={css.campo}>
                                <Input
                                    label={"Confirme sua nova senha"}
                                    type={"password"}
                                    placeholder={"Confirme sua nova senha"}
                                    required={true}
                                />
                            </div>

                            <div className={css.areaBotao}>
                                <Botao cor={'amarelo'} texto={'Alterar senha'} pagina={'/login'} />
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