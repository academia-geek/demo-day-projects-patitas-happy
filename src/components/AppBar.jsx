import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

const AppBarLanding = () => {
  return (
    <Row>
      <Col span={24}>
        <AppBar component="nav">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Link to="/home">
              <img src={logo} alt="logo" className="logo" />
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              
                <Link
                  to="/hallazgo"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  {" "}
                  Encuentra aquí a tu mascota perdida
                </Link>
             
              <Button sx={{ color: "#000000", textTransform: 'none', width:'100px' }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  Login in{" "}
                </Link>
              </Button>
              <Button sx={{ color: "#000000", textTransform: 'none', width:'100px' }}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  {" "}
                  Register
                </Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Col>
    </Row>
  );
};

export default AppBarLanding;
