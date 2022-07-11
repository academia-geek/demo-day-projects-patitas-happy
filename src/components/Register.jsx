import { TextField } from '@mui/material';
import React from 'react';
import { Button, Div1, Div2, Form, TitleR   } from '../Styles/Styles';
import fb from "../img/fb.png"
import go from "../img/go.png"


const Register = () => {
    return (
        <Div1>
            <Div2>
                <TitleR>Register</TitleR>
                <p>Registrate con tus datos para poder iniciar sesión.</p>
                <Form>
                <TextField style={{margin:'10px 20px'}} id="outlined-basic1" label="Name" variant="outlined" />
                <TextField style={{margin:'10px 20px'}} id="outlined-basic2" label="Age" variant="outlined" />
                <TextField style={{margin:'10px 20px'}} id="outlined-basic3" label="Email" variant="outlined" />
                <TextField style={{margin:'10px 20px'}} id="outlined-basic4" label="Password" variant="outlined" />
                <Button>Registrar</Button>
                </Form>
                <p>Ya tienes cuenta? Inicia sesión aquí.</p>
                <div style={{display:'flex', justifyContent:'center', margin:'10px 0'}}>
                    <img width={90} height={50} src={fb} alt="" />
                    <img width={50} height={50} src={go} alt="" />

                </div>
            </Div2>
        </Div1>
    );
};

export default Register;