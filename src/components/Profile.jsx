import React from 'react';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editUserAsync, editUserProviderAsync } from '../Redux/actions/actionsRegister';
import { FileUpload } from '../helpers/FileUpload';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const Profile = () => {

    const dispatch = useDispatch();

    const user = useSelector(store => store.loginStore);


    const [formValue, handleInputChange] = useForm({

        displayName: user.displayName ? user.displayName : user.fullname,
        fullname: user.displayName ? user.displayName : user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fecha: user.fecha,
        

    })



    const handleSubmit = (e, id, accessToken, admin, provider ='', formValue) => {
        e.preventDefault();

        const usuario = {
            id: id,
            email: formValue.email,
            password: formValue.password,
            displayName: formValue.displayName,
            accessToken: accessToken,
            photoURL: formValue.photoURL,
            phoneNumber: formValue.phoneNumber,
            fullname: formValue.displayName,
            admin: admin,
            fecha: formValue.fecha,
            provider: provider
        }

        if (provider === 'emailPassword'){
            dispatch(editUserAsync(usuario))
        }else {
            dispatch(editUserProviderAsync(usuario))
        }

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

                <form onSubmit={(e) => { handleSubmit(e, user.id, user.accessToken, user.admin, user.provider, formValue) }} style={{ justifyContent: 'center' }}>

                    <img width={70} height={70} src={user.photoURL} alt="" style={{ borderRadius: '100%', objectFit: 'cover' }} />
                    <input type="file" name="photoURL" onChange={handleFileChange} />

                    <h5>Your fullname</h5>

                    <input type="text" name="displayName" value={formValue.displayName} onChange={handleInputChange} />

                    <h5>Your email</h5>

                    <input type="text" name="email" value={formValue.email} onChange={handleInputChange} disabled />
                    <br />
                    <h5>Your numberphone</h5>

                    <input type="text" name="phoneNumber" value={formValue.phoneNumber} onChange={handleInputChange} />
                    <br />

                    <h5>Your birthday</h5>

                    <input type="date" name="fecha" value={formValue.fecha} onChange={handleInputChange} />
                    <br />

                    {
                        user.provider === 'emailPassword' && (

                            <>
                                <h5>Your password</h5>

                                <input type="password" name="password" value={formValue.password} onChange={handleInputChange} />
                                <br />
                            </>

                        )
                    }



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