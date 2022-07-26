import { Col, Row, Card } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataHallazgosAsync } from "../Redux/actions/actionsHallazgos";
import "../Styles/HallazgoStyles.css";
const { Meta } = Card;
const Hallazgo = ({ data }) => {
  const dispatch = useDispatch();

  const { form } = useSelector(store => store.formStore);

  useEffect(() => {
    dispatch(getDataHallazgosAsync());
  }, [dispatch]);
  return (
    <div className="cover">
      <h1 style={{ margin: "15px auto" }}>Mascotas Encontradas</h1>
      <Row>
        <Col span={24}>
          <Row justify="space-evenly">
            {form.map((hgz, i) => (
              <Col span={4} key={i}>
                <Card
                  style={{
                    width: 210,
                    height: 300,
                  }}
                  hoverable
                  cover={
                    <img
                      alt="hglz"
                      src={hgz.imagen}
                      style={{
                        maxWidth: 210,
                        maxHeight: 220,
                      }}
                    />
                  }
                >
                  <Meta title={hgz.fecha} description={hgz.location} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Hallazgo;
