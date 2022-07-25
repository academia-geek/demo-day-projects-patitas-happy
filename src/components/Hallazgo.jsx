import { Col, Row } from 'antd';
import React from 'react';

const Hallazgo = () => {
    return (
        <div>
            <h1>Mascotas Encontradas</h1>
            <Row justify="space-evenly">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
        </div>
    );
};

export default Hallazgo;