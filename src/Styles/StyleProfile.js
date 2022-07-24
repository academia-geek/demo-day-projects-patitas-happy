import { Input } from "antd";
import styled from "styled-components";

export const TitleProfile = styled.h1`
  color: #47525e;
  font-size: 40px;
  line-height: 51px;
  font-weight: bold;
`;

export const PafChange = styled.p`
  color: #8190a5;
  font-size: 18px;
  line-height: 28px;
`;

export const SectionImg = styled.section`
  text-align: center;
  margin: 20px 0;
`;
export const SectionE = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 15px 0;
  @media screen and (min-width: 1024px) {
    width: 450px;
  }
`;
export const TitleYour = styled.h2`
  color: #8190a5;
  font-size: 18px;

  width: 50%;
`;
export const InputAntd = styled(Input)`
  font-family: "Lato";
  font-size: 18px;
`;
export const BtnRosa = styled.button`
  border: none;
  background-color: #f95f62;
  border-radius: 5px;
  width: 192px;
  height: 50px;
  font-size: 18px;
  color: white;
  text-align: center;
  margin: 30px auto;
  justify-content: center;
`;
