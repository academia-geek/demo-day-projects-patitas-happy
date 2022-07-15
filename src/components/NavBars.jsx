import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png'
import { ButtonLogout, ImgProfile } from '../Styles/StyleNav';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogoutAsync } from '../Redux/actions/actionsRegister';
import {Link} from 'react-router-dom'

const NavBars = () => {

    const dispatch = useDispatch()


    const user = useSelector(store => store.loginStore)
    console.log(user)
    return (
        <div>
            <Navbar className='m-0' expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="124"
                            height="124"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                        <Nav className="justify-content-end">
                            <Nav.Link className='mx-3 my-auto' href="#home">HOME</Nav.Link>
                            <Nav.Link className='mx-3 my-auto' href="#link">MASCOTAS</Nav.Link>
                            <Nav.Link className='mx-3 my-auto' href="#link">ADOPCIÓN</Nav.Link>

                            <NavDropdown className='mx-3 my-auto' title="INFORMACIÓN" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">DONACIONES</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">ALIADOS</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className='mx-3 my-auto' href="#link">CONTACTANOS</Nav.Link>
                            {
                                // console.log(user.photoURL)
                                  <Link  to='/profile'><ImgProfile  src={user.photoURL}  alt="" /></Link>
                                    
                                
                            }
                            <Nav.Link className=' my-auto' href="#link"> <ButtonLogout onClick={()=> dispatch(actionLogoutAsync())}>LOGOUT</ButtonLogout></Nav.Link>

                            
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBars;