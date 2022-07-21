import { Grid } from "@mui/material";
import styled from "styled-components";
import dog from "../img/info/image.png";

export const GridInfo = styled(Grid)`
  background-image: url(${dog});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 630px;
  @media screen and (max-width: 430px) {
    height: 300px;
  }
`;
export const DivN = styled.div`
  text-align: center;
  background-color: #969faa;
  width: 441px;
  height: 171px;
  padding: 30px;
  opacity: 85%;
  position: absolute;
  left: 950px;
  top: 430px;
  @media screen and (max-width: 430px) {
    position: relative;
    left: 190px;
    width: 170px;
    padding: 15px;
    height: 70px;
    top: 150px;
  }
`;
export const H1 = styled.h1`
  color: white;
  font-size: 40px;
  @media screen and (max-width: 430px) {
    font-size: 15px;
  }
`;

export const DivFlex = styled.div``;
