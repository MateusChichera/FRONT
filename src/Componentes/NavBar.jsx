import './NavBar.css';
import { Link, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FaBars, FaCogs, FaHome, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

function NavBar() {
    const [show, setShow] = useState(true);
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [showBuscarSubmenu, setShowBuscarSubmenu] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const handleSubmenu = () => {
        setShowSubmenu(!showSubmenu);
    };

    const handleBuscarSubmenu = () => {
        setShowBuscarSubmenu(!showBuscarSubmenu);
    };

    return (
        <>
            <div className={`side-bar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav flex-column text-white w-100">
                    <li className="nav-link">
                        <span className="h3 text-white my-2">Meu Sistema</span>
                    </li>
                    <li className="nav-link">
                        <Link to='/'>
                            <FaHome />
                            <span className="mx-2" style={{ color: 'white' }}>Home</span>
                        </Link>
                    </li>
                    <li className="nav-link">
                        <div onClick={handleSubmenu} style={{ cursor: 'pointer' }}>
                            <FaCogs />
                            <span className="mx-2" style={{ color: 'white' }}>Cadastrar</span>
                            {showSubmenu ? <FaChevronUp className="mx-2" /> : <FaChevronDown className="mx-2" />}
                        </div>
                        {showSubmenu && (
                            <ul className="nav flex-column text-white w-100 submenu">
                                <li className="nav-link">
                                    <Link to='/salas'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Sala</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/Horarios'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Horario</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/clientes'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Cliente</span>
                                    </Link>
                                </li>
                                <li className="nav-link">
                                    <Link to='/planos'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Plano</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="nav-link">
                        <div onClick={handleBuscarSubmenu} style={{ cursor: 'pointer' }}>
                            <FaCogs />
                            <span className="mx-2" style={{ color: 'white' }}>Buscar</span>
                            {showBuscarSubmenu ? <FaChevronUp className="mx-2" /> : <FaChevronDown className="mx-2" />}
                        </div>
                        {showBuscarSubmenu && (
                            <ul className="nav flex-column text-white w-100 submenu">
                                <li className="nav-link">
                                    <Link to='/buscar'>
                                        <FaCogs />
                                        <span className="mx-2" style={{ color: 'white' }}>Clientes</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
            <div className="p-1 my-container">
                <nav onClick={handleShow} className="navbar top-navbar navbar-light bg-light px-1">
                    <FaBars />
                    <p>Olá, Usuario</p>
                </nav>
            </div>
            <div style={{ paddingLeft: show ? '250px' : '0' }}>
                <Container>
                    <Outlet />
                </Container>
            </div>
        </>
    );
}

export default NavBar;
