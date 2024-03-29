import { Col, Row, Card ,Image } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataHallazgosAsync } from "../Redux/actions/actionsHallazgos";
import "../Styles/HallazgoStyles.css";
import "../Styles/LandingPage.css";
import Footer from "./Footer";
const { Meta } = Card;
const Hallazgo = ({ data }) => {
  const dispatch = useDispatch();

  const { form } = useSelector(store => store.formStore);

  useEffect(() => {
    dispatch(getDataHallazgosAsync());
  }, [dispatch]);
  return (
    <div className="cover">
      <h1 style={{ margin: "35px auto" }}>Mascotas Encontradas</h1>
      <Row>
        <Col span={24}>
          <Row justify="space-evenly" className="section"
            style={{margin:'50px 0'}}
            
          >
            {form.map((hgz, i) => (
              <Col span={4} key={i}>
                <Card
                  style={{
                    width: 220,
                    height: 300,
                  }}
                  hoverable
                  cover={
                    <Image
                      alt="hglz"
                      src={hgz.imagen}
                      style={{
                        width: 220,
                        height: 220,
                      }}
                    />
                  }
                >
                  <Meta
                    title={hgz.fecha}
                    description={hgz.location}
                    details="hola"
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Footer/>
    </div>
  );
};

export default Hallazgo;
