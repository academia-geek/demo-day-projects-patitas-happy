import React, { useEffect } from 'react';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editUserAsync, editUserSync } from '../Redux/actions/actionsRegister';
import { FileUpload } from '../helpers/FileUpload';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const Profile = () => {

    const dispatch = useDispatch()

    const user = useSelector(store => store.loginStore)
    console.log(user)
   
    const [formValue, handleInputChange] = useForm({
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fecha: user.fecha,
        

    })

    const { displayName, email, photoURL, phoneNumber } = formValue

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(displayName, email, photoURL, phoneNumber)
        dispatch(editUserAsync(displayName, email, photoURL, phoneNumber))

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        //llamar a la configuracion de Cloudinary
        FileUpload(file)
            .then((resp) => {
                formValue.photoURL = resp
                console.log(resp)
            })
            .catch((error) => { console.warn(error) });

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Profile</h1>
            <p>change or update your info user.</p>
            <div style={{ borderRadius: '100%' }}>
            </div>
            {

                <form onSubmit={handleSubmit} style={{ justifyContent: 'center' }}>

                    <img width={120} height={120} src={user.photoURL} alt="" style={{ borderRadius: '100%' }} />
                    <IconButton color="primary" aria-label="upload picture" component="label" style={{marginTop:'80px'}}>
                        <input hidden accept="image/*" type="file" name="photoURL" onChange={handleFileChange}/>
                        <PhotoCamera />
                    </IconButton>
                    {/* <input type="file" name="photoURL" onChange={handleFileChange} /> */}

                    <h5>Your name</h5>

                    <input type="text" name="displayName" value={formValue.displayName} onChange={handleInputChange} />

                    <h5>Your Email</h5>

                    <input type="text" name="email" value={formValue.email} onChange={handleInputChange} disabled />
                    <br />
                    <h5>Your telfono</h5>

                    <input type="text" name="phoneNumber" value={formValue.phoneNumber} onChange={handleInputChange} />
                    <br />

                    <h5>Your date</h5>

                    <input type="date" name="fecha" value={formValue.fecha} onChange={handleInputChange} />
                    <br />



                    <button>Aceptar</button>
                </form>


            }

            <div>
                <span>Eliminar cuenta</span>

            </div>
            <Footer />
        </div>
    );
};

export default Profile;