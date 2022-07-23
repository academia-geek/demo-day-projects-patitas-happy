import { Grid } from "@mui/material";
import styled from "styled-components";

export const GridDonar = styled(Grid)`
    background-image: url('https://res.cloudinary.com/kellycamayo/image/upload/v1658260898/imagenesDemoday/fotojet-12_ncijvk.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width:100%;
    height:630px;
    @media screen and (max-width: 430px){
       height: 300px;
    }
`
export const ParrafoAdop = styled.p`
    color: #8190A5;
    font-size: 27px;
    line-height: 28px;
    width: 939px;
    text-align: center;
    margin-top: 20px;
`

export const FormAdop = styled.form`
    margin: 35px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
   
`
export const SectionAdop = styled.section`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 768px) {
       
        flex-direction: column;
       
    }
`