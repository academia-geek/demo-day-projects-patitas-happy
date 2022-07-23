import styled from "styled-components";
import img from "../img/img22.png"



export const Div1 = styled.div`
    background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;    
    align-items: center;

`
export const Div2 = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 70px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;

@media screen and (max-width: 425px) {
    padding: 20px 30px;
}

@media screen and (max-width: 380px) {
    padding: 20px 20px;
}

@media screen and (min-width: 1340px) {
    padding: 10px ;
    height: 600px;
    }
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const TitleR = styled.h1`
    font-size: 48px;
    color: #47525E;
    font-family: 'Fira mono';
`
export const Button = styled.button`
    background-color: #F5CEC7;
    border: none;
    width: 160px;
    height: 40px;
    border-radius: 5px;
    color: black;
    font-family: 'Fira Mono';

    font-size: 18px;
   
`
export const Span = styled.span`
    
  cursor: pointer;
  font-family: 'Fira Mono';
`
