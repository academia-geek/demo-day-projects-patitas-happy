import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { ButtonLogout, ImgProfile } from "../Styles/StyleNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { actionClearRegisterAsync, actionLogoutAsyn } from "../Redux/actions/actionsLogin";

const NavBars = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.userStore);
  

  const onClick = () => {
    dispatch(actionLogoutAsyn());
    dispatch(actionClearRegisterAsync());
    localStorage.clear();
  };


  return (
    <div>
      <Navbar className="m-0" expand="xl">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <img
                src={logo}
                width="90"
                height="90"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">

            <Nav className="justify-content-end">
              <NavLink to="/home" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                HOME
              </NavLink>

              <NavLink to="/mascotas" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                MASCOTAS
              </NavLink>

              <NavLink to="/donar" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                DONAR
              </NavLink>

              <NavLink to="/info" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                INFORMACIÓN
              </NavLink>

              <NavLink to="/solicitudes" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                SOLICITUDES
              </NavLink>

              <NavLink to="/contactanos" className="mx-3 my-auto nav-item nav-link"
                activeclassname='active'
              >
                CONTACTANOS
              </NavLink>

              {
                // console.log(user.photoURL)
                <Link to="/profile">
                  <ImgProfile
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
