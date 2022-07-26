import styled from "styled-components";


export const DivList = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 40px 0;
    @media screen and (max-width:425px) {
        flex-direction: column;

    }
`
export const ButtonR = styled.button`
    border: none;
    background-color:#F95F62;
    border-radius : 3px;
    color:white;
    width: 180px;
    height: 40px;
`