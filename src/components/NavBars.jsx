import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import { ButtonLogout, ImgProfile } from "../Styles/StyleNav";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutAsyn } from "../Redux/actions/actionsLogin";
import { Link } from "react-router-dom";
import { actionClearRegisterAsync } from "../Redux/actions/actionsRegister";

const NavBars = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.loginStore);
  const [datos, setDatos] = useState([]);

  const onClick = () => {
    dispatch(actionLogoutAsyn());
    dispatch(actionClearRegisterAsync());
    localStorage.clear();
  };

  const handleEdit = us => {
    setDatos(us);
  };

  const ver = e => { };

  return (
    <div>
      <Navbar className="m-0" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <img
                src={logo}
                width="124"
                height="124"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="justify-content-end">
              <Nav className="mx-3 my-auto">
                <Link to="/home">HOME</Link>
              </Nav>
              <Nav className="mx-3 my-auto" >
                <Link to="/mascotas">MASCOTAS</Link>

              </Nav>
              <Nav.Link className="mx-3 my-auto" >
                DONAR
              </Nav.Link>
              <Nav className="mx-3 my-auto" >
                <Link to="/info">INFORMACIÓN</Link>

              </Nav>
              {/* <NavDropdown
                className="mx-3 my-auto"
                title="INFORMACIÓN"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  DONACIONES
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">ALIADOS</NavDropdown.Item>
              </NavDropdown> */}
              <Nav className="mx-3 my-auto">
                <Link to="/solicitudes">SOLICITUDES</Link>
              </Nav>
              <Nav className="mx-3 my-auto">
                <Link to="/contactanos">CONTACTANOS</Link>
              </Nav>
              {
                // console.log(user.photoURL)
                <Link to="/profile">
                  <ImgProfile
                    onClick={() => handleEdit(user)}
                    src={user.photoURL}
                    alt=""
                  />
                </Link>
              }
              <Nav.Link className=" my-auto" href="#link">
                {" "}
                <ButtonLogout onClick={onClick}>LOGOUT</ButtonLogout>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBars;
