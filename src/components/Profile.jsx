import React, { useEffect } from 'react';
import Footer from './Footer';
import fb from '../img/profile.jpg'
import { listUserAsync, listUserSync } from '../Redux/actions/actionsRegister';
import { useDispatch, useSelector } from 'react-redux';
import { authentication } from '../Firebase/firebaseConfig';
import { indexedDBLocalPersistence } from 'firebase/auth';

const Profile = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listUserAsync())
    }, [dispatch])

   const user = useSelector(store => store.loginStore)
       
    console.log(user)
    

    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Profile</h1>
            <p>change or update your info user.</p>
            <div style={{ borderRadius: '100%' }}>
            </div>
            {
              
                    <form  style={{ justifyContent: 'center' }}>
                                        <img width={70} src={user.photoURL} alt="" style={{ borderRadius: '100%' }} />
                                        <input type="file"/>

                    <h5>Your name</h5>
                    <h5>{user.displayName}</h5>
                    <input type="text" />
                    <h5>Your Email</h5>
                    <h5>{user.email}</h5>
                    <input type="text" />
                    <h5>Fecha de Nacimiento</h5>
                    <h5>{user.phoneNumber}</h5>

                    <input type="text" /> <br />
                    <h5>Telefono</h5>
                    <input type="text" /> <br />
    
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