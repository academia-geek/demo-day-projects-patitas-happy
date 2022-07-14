import React from 'react';
import {  Row, Col, Accordion } from 'react-bootstrap';
import dog from '../img/dog-sinfondo.png'
import '../Styles/Style.css'
import { ButtonRosa, ImgDog, ParrafoH, TitleH } from '../Styles/StyleHome';




const Home = () => {

    
    return (
        <div >
            <Row className='p-0' style={{margin:'0px '}}>
                <Col className='p-0'  >
                    <TitleH>
                        ¿Quieres saber el nombre de tu próximo compañero de aventuras?
                    </TitleH>
                    <ParrafoH>Conoce los detalles de los animales que tenemos en nuestra fundación para que elijas al mejor compañero para ti.
                    </ParrafoH>
                    <ButtonRosa>VER MASCOTAS</ButtonRosa>
                </Col>
                <Col ><ImgDog  src={dog} alt="" /></Col>
            </Row>

            <Row className='p-0'>
                <Col  className='p-0' style={{textAlign:'center', marginTop:'80px'}}>
                    <h2>TOMA NOTA </h2>
                    <p>Tips para el bienestar fisico y mental de tu mascota en casa.</p>

                    <Accordion style={{padding:'50px'}} >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>

            </Row>
            
            </div>
        
    );
};

export default Home;