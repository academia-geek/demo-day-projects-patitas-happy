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
    width: 33%;
    height: 25%;
    padding: 30px;
    opacity: 85%;
    float:right;
    margin-right:40px;
    margin-top: 300px;
    
    @media (max-width: 375px){
        margin-top:150px;
        margin-right:20px;
        padding:10px;
    }
    @media (max-width: 425px){
        margin-top:150px;
        margin-right:20px;
        padding:10px;

    }
    @media (max-width: 768px){
        padding-top: 13px;
    }
   
`
export const H1 = styled.h1`
    color:white;
    font-size: 40px ;
    @media screen and (max-width:375px){
        font-size: 15px !important  ;
    }
    @media screen and (max-width:425px){
        font-size: 15px !important;
    }
    @media screen and (max-width: 768px){
        font-size: 30px  ;
    }
    @media screen and (max-width: 1024px){
        font-size: 34px ;
    }

`

export const DivFlex = styled.div`

`

export const TitleC = styled.h1`
    color: #47525E;
    font-size: 53px;
    font-weight: bold;
    text-align: center;
    @media screen and (max-width:430px){
        font-size: 35px;
       
    }
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
        font-size: 20px;
        padding: 30px;
    }
    @media screen and (max-width:1030px){
        width: 100%;
       
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
    @media screen and (max-width: 425px){
        width:230px;
        font-size: 25px;
        height: 70px;
    }
`
export const Img1 = styled.img`
    @media screen and (max-width: 1024px){
        width:300px;
    }
`
export const Img2 = styled.img`
    @media screen and (max-width: 425px){
        width:290px;
    }
    @media screen and (width: 1024px){
       
       width: 450px;
    }
`
export const Img3 = styled.img`

    @media screen and (max-width: 425px){
        width:300px;
    }
    @media screen and (width: 1024px){
       
       width: 400px;
    }
`