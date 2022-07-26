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
              <img src={logo} alt="logo" className="logo" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button sx={{ color: "#000000" }}>
                <Link
                  to="/hallazgo"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  {" "}
                  HALLAZGOS
                </Link>
              </Button>
              <Button sx={{ color: "#000000" }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  LOGIN IN{" "}
                </Link>
              </Button>
              <Button sx={{ color: "#000000" }}>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#343f4b" }}
                >
                  {" "}
                  REGISTER
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
