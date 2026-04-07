import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CadastroOng from "./pages/CadastroOng.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CadastroDoador from "./pages/CadastroDoador.jsx";
import CadastroAdm from "./pages/CadastroAdm.jsx";
import EsqueciSenha from "./pages/EsqueciSenha.jsx";
import VerificarCodigoSenha from "./pages/VerificarCodigoSenha.jsx";
import TelaErro from "./pages/TelaErro.jsx";
import RedefinirSenha from "./pages/RedefinirSenha.jsx";
import AreaRestrita from "./pages/AreaRestrita.jsx";
import ConfirmarEmail1 from "./components/ConfirmarEmail1/ConfirmarEmail1.jsx";

export default function App() {
  return (
      <BrowserRouter>
          <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastroOng" element={<CadastroOng/>} />
            <Route path="/cadastroDoador" element={<CadastroDoador/>} />
            <Route path="/cadastroAdm" element={<CadastroAdm/>} />
            <Route path={"/confirmaremail"} element={<ConfirmarEmail1/>} />
            <Route path="/esqueciSenha" element={<EsqueciSenha/>} />
            <Route path="/redefinirSenha" element={<RedefinirSenha/>} />
            <Route path="/verificarCodigo" element={<VerificarCodigoSenha/>} />
            <Route path="/*" element={<TelaErro/>} />
            <Route path="/dashboard" element={<AreaRestrita/>} />

        </Routes>
          <Footer/>
      </BrowserRouter>
  )
}