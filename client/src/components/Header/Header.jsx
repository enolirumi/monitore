import { useNavigate } from 'react-router-dom'
import styles from './Styles/Header.module.scss'
import ImgLogo from "../../assets/imgLogo.svg"
import {useState} from 'react'

const Header = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    function logout() {
        localStorage.clear();
        navigate('/')
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
            <img src={ImgLogo} alt="" onClick={() => navigate(`/home`)}/>
            <nav>
                <ul>
                    <a onClick={() => navigate('/home')}><li>Início</li></a>
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
                <div className='container-login-register-btn'>
                    <div>Logar</div>
                    <div>Registrar</div>
                </div>
            }
        </header>
    )
}

export default Header