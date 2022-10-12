import { useNavigate } from 'react-router-dom'
import styles from './Styles/Header.module.scss'
import ImgLogo from "../../assets/imgLogo.svg"

const Header = () => {

    const navigate = useNavigate()

    function logout() {
        localStorage.clear();
        navigate('/')
    }

    function renderLogin() {
        
    }

    return (
        <header className={``}>
            <img src={ImgLogo} alt="" onClick={() => navigate(`/home`)}/>
            <nav>
                <ul>
                    <a onClick={() => navigate('/home')}><li>Início</li></a>
                    <a ><li>aaaaaa</li></a>
                    <a onClick={() => navigate('/alimentos')}><li>Buscar Alimentos</li></a>
                </ul>
            </nav>
            {localStorage.length > 0 &&
                <div>
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