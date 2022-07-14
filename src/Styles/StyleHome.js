import { Grid } from "@mui/material";
import { Accordion } from "react-bootstrap";
import styled from "styled-components";

export const TitleH = styled.h3`
    color: #47525E;
    font-weight: bold;
    width: 365px;
    @media screen and (max-width: 380px) {
        
    }
    
`
export const ParrafoH = styled.p`
    color: #8190A5;
    width: 365px;
    font-size: 18px;
    margin-top: 20px;
`
export const ButtonRosa = styled.button`
    background-color: #F5CEC7;
    border: none;
    border-radius: 5px;
    width: 190px;
    height: 50px;
    margin-top: 20px;
    
`
export const ImgDog = styled.img`
    width: 785px;
    height: 450px;
    margin-top: 100px;
    @media screen and (max-width: 480px) {
        width: 350px;
        height: 200px;
    }
    @media screen and (min-width: 1024px) {
        width: 550px;
        height: 350px;
    }
`
export const Acordion = styled(Accordion)`
    padding: 20px ;
    border: #8492A6;
    margin-bottom:190px;
    
    @media screen and (max-width: 380px) {
        border: #8492A6;
        width: 320px !important;
        margin-bottom: 50px;
    }
`
export const Grid1 = styled(Grid)`
    
    padding-top: 160px;
    @media screen and (max-width: 380px) {
        padding-top: 0;
        
    }
    @media screen and (max-width: 1540px) {
        width: 450px;
        
    }
`