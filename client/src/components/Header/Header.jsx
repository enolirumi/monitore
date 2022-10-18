import { Link, useNavigate } from 'react-router-dom'
import styles from './Styles/Header.module.scss'
import ImgLogo from "../../assets/imgLogo.svg"
import {useState} from 'react'

const Header = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    function logout() {
        localStorage.clear();
        navigate('/')
        setLogged(false)
    }

    function renderLogin() {
        
    }

    // function ModalOpen(){
    //     return(
    //         <>
    //          {localStorage.length > 0 &&
    //             <div className={styles['modal']}>
    //                 <h3>Olá, <span>{localStorage.getItem('Nome')}</span></h3>
    //                 <a className={styles['btn-sair']} onClick={() => { logout() }}>Sair</a>
    //             </div>
    //         }
    //         </>
    //     )
    // }

    return (
        <header className={``}>
            <div className={styles["img"]}>
            <img src={ImgLogo} alt="" onClick={() => navigate(`/`)}/>

            </div>
            <nav>
                <ul>
                    <a onClick={() => navigate('/')}><li>Início</li></a>
                    <a onClick={() => navigate('/alimentos')}><li>Buscar Alimentos</li></a>
                </ul>
            </nav>
           {/* <button className={styles['btn-profile']} onClick={() => open ? setOpen(false): setOpen(true) }>
            Teste
           </button>
           {open? <ModalOpen/> : ''} */}
           {localStorage.length > 0 &&
                <div className={styles['modal']}>
                    <h3>Olá, <span>{localStorage.getItem('Nome')}</span></h3>
                    <a className={styles['btn-sair']} onClick={() => { logout() }}>Sair</a>
                </div>
            }
            {localStorage.length == 0 &&
                <div className={styles['container-login-register-btn']}>
                    <Link to='/login' className={styles['btn-unlogged']} >Logar</Link>
                    <Link to='/cadastro' className={styles['btn-unlogged']}>Cadastrar</Link>
                </div>
            }
        </header>
    )
}

export default Header