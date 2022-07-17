import React from 'react'
import { Button, ButtonGroup, Grid } from '@mui/material'
import dog from '../assets/resena1.jpg'
import Footer from "./Footer";
import { ButtonD, Item, TitleAgendarV, TitleDog, TitleHyF } from '../Styles/StylesDetalle';


const DetailsMascotas = () => {
  return (
    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
      justifyContent='center'

    >
      <Grid

        padding='30px'
      >

        <div style={{ width: '540px', height: '580px', background: 'red' }}>
          <img style={{ width: '100%', height: '100%' }} src={dog} alt="" />

        </div>
      </Grid>
      <Grid

        padding='30px'
      >

        <TitleDog>BLUE</TitleDog>
        <div style={{ display: 'flex' }}>
          <div>
            <ul>
              <Item>primer item</Item>
              <Item>primer item</Item>
              <Item>primer item</Item>
              <Item>primer item</Item>
            </ul>
          </div>
          <div>
            <ul>
              <Item>primer item</Item>
              <Item>primer item</Item>
              <Item>primer item</Item>
              <Item>primer item</Item>
            </ul>
          </div>

        </div>
        <div>
          <ButtonGroup aria-label="outlined primary button group"
          sx={{
            display: 'flex',
            justifyContent:'center',
            
          }

          }
          >
            <Button sx={{background:'#F5CEC7', border:'2px solid #47525E', borderRadius:'5px', color:'#47525E'}}>One</Button>
            
            <Button sx={{background:'#F5CEC7', border:'2px solid #47525E', borderRadius:'5px', color:'#47525E'}}>Three</Button>
          </ButtonGroup>
        </div>

        <div>
          <TitleAgendarV>Agendar Visita</TitleAgendarV>
          <TitleHyF>Hora</TitleHyF>
          <input type="text" />
          <TitleHyF>Fecha</TitleHyF>
          <input type="text" />
        </div>

      </Grid>
      <Footer />

    </Grid>
  )
}

export default DetailsMascotas