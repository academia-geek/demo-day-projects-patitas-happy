import { Grid } from "@mui/material";
import styled from "styled-components";
import dog from '../img/info/image.png'


export const GridInfo = styled(Grid)`
    background-image: url(${dog});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width:100%;
    height:630px;
    @media screen and (max-width: 430px){
       height: 300px;
    }
`
export const DivN = styled.div`
    text-align: center;
    background-color: #969FAA;
    width: 441px;
    height: 171px;
    padding: 30px;
    opacity: 85%;
    position: absolute;
    left: 950px;
    top: 430px;
    
    @media screen and (max-width: 430px){
        position: relative;
        left: 190px;
        width: 170px;
        padding: 15px;
        height: 70px;
        top:150px;
    }
    @media screen and (min-width: 768px){
        position: relative;
        left: 490px;
        top: 280px;
        width: 250px;
    }
    @media screen and (min-width: 1024px){
        position: relative;
        left: 630px;
        top: 260px;
        width: 370px;
    }
    @media screen and (min-width: 1330px){
        position: relative;
        left: 890px;
        top: 280px;
    }
    @media screen and (min-width: 1440px){
        position: relative;
        left: 950px;
        top: 280px;
    }
`
export const H1 = styled.h1`
    color:white;
    font-size: 40px ;
    @media screen and (max-width:430px){
        font-size:15px;
    }
    @media screen and (max-width: 768px){
       font-size: 30px ;
    }

`

export const DivFlex = styled.div`

`

export const TitleC = styled.h1`
    color: #47525E;
    font-size: 53px;
    font-weight: bold;
`
export const Paff = styled.p`
    color: #47525E;
    font-size: 28px;
    line-height: 36px;
    width: 689px;
    text-align: justify;
    align-items: center;
    @media screen and (max-width:430px){
        width: 350px;
       
    }
`
export const ButtonNegro = styled.button`
    background-color: #47525E;
    border-radius: 5px;
    width: 396px;
    height: 85px;
    color: #FFFFFF;
    border: none;
    font-size: 34px;
    text-align: center;
    
`