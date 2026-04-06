import {Link} from "react-router-dom";
import css from "./Botao.module.css";

export default function Botao({ acao, pagina, texto, cor = "amarelo" }) {
    return (
        <Link to={pagina}>
            <button type="button" className={css[cor]} onClick={acao}>{texto}</button>
        </Link>
    )
}
