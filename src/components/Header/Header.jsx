import React, {useEffect, useState} from 'react';
import css from './Header.module.css';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Header() {
    const [token, setToken] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(function () {
        var tokenLocal = localStorage.getItem("token")

        if(tokenLocal){
            setToken(tokenLocal);
        } else {
            setToken(false)
        }
    }, [location])
    // location: retorna um objeto location que representa
    // a url atual, permitindo que componentes reajam a mudanças de navegação


    function irParaPerfil(){
        navigate('/dashboard')
    }

    if (token) {
        return (
            <header className={css.headerContainer}>
                <div className={css.headerContent}>


                    <a href="/" className={css.logoLink}>
                        <img src="/logo.png" alt="Logo Doar+" className={css.logo} />
                    </a>


                    <nav className={`d-none d-lg-flex ${css.desktopNav}`}>
                        <ul className={css.navList}>
                            <li><a href="/" className={css.link}>Home</a></li>
                            <li><a href="/" className={css.link}>Benefícios</a></li>
                            <li><a href="/" className={css.link}>Junte-se a nós!</a></li>
                            <li><a href="/" className={css.link}>ONGs e projetos</a></li>
                        </ul>
                    </nav>


                    <div className={`d-none d-lg-flex ${css.divbotoes}`}>
                        <img src="/public/perfil.png" onClick={irParaPerfil}/>
                    </div>


                    <button
                        className={`d-lg-none ${css.actionBtn}`}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#menuLateral"
                    >
                        <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2" y1="2" x2="33" y2="2" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                            <line x1="2" y1="12" x2="33" y2="12" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                            <line x1="2" y1="22" x2="33" y2="22" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                    </button>


                    <div className={`offcanvas offcanvas-end ${css.offcanvasCustom}`} tabIndex="-1" id="menuLateral">


                        <div className={css.offcanvasHeaderCustom}>
                            <button type="button" className={css.actionBtn} data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="5" y1="2" x2="30" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                                    <line x1="30" y1="2" x2="5" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        <div className={css.offcanvasBodyCustom}>
                            <ul className={css.navListMobile}>
                                <li><a href="/" className={css.linkMobile}>Home</a></li>
                                <li><a href="/" className={css.linkMobile}>Benefícios</a></li>
                                <li><a href="/" className={css.linkMobile}>Junte-se a nós!</a></li>
                                <li><a href="/" className={css.linkMobile}>ONGs e Projetos</a></li>

                                <li className="mt-4"><Link to={"/cadastroOng"} className={css.linkMobile}>Cadastro</Link></li>
                                <li><Link to={"/login"} className={css.linkMobile}>Login</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </header>
        )

    }
    else {
        return (
            <header className={css.headerContainer}>
                <div className={css.headerContent}>


                    <a href="/" className={css.logoLink}>
                        <img src="/logo.png" alt="Logo Doar+" className={css.logo} />
                    </a>


                    <nav className={`d-none d-lg-flex ${css.desktopNav}`}>
                        <ul className={css.navList}>
                            <li><a href="/" className={css.link}>Home</a></li>
                            <li><a href="/" className={css.link}>Benefícios</a></li>
                            <li><a href="/" className={css.link}>Junte-se a nós!</a></li>
                            <li><a href="/" className={css.link}>ONGs e projetos</a></li>
                        </ul>
                    </nav>


                    <div className={`d-none d-lg-flex ${css.divbotoes}`}>
                        <Link to={"/cadastroOng"}><button className={css.cadastro}>Cadastro</button></Link>
                        <Link to={"/login"}><button className={css.login}>Login</button></Link>
                    </div>


                    <button
                        className={`d-lg-none ${css.actionBtn}`}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#menuLateral"
                    >
                        <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2" y1="2" x2="33" y2="2" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                            <line x1="2" y1="12" x2="33" y2="12" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                            <line x1="2" y1="22" x2="33" y2="22" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                    </button>


                    <div className={`offcanvas offcanvas-end ${css.offcanvasCustom}`} tabIndex="-1" id="menuLateral">


                        <div className={css.offcanvasHeaderCustom}>
                            <button type="button" className={css.actionBtn} data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="5" y1="2" x2="30" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                                    <line x1="30" y1="2" x2="5" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>

                        <div className={css.offcanvasBodyCustom}>
                            <ul className={css.navListMobile}>
                                <li><a href="/" className={css.linkMobile}>Home</a></li>
                                <li><a href="/" className={css.linkMobile}>Benefícios</a></li>
                                <li><a href="/" className={css.linkMobile}>Junte-se a nós!</a></li>
                                <li><a href="/" className={css.linkMobile}>ONGs e Projetos</a></li>

                                <li className="mt-4"><Link to={"/cadastroOng"} className={css.linkMobile}>Cadastro</Link></li>
                                <li><Link to={"/login"} className={css.linkMobile}>Login</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </header>
        )
    }
}