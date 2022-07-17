import React, { useEffect } from 'react';
import Footer from './Footer';
import fb from '../img/profile.jpg'
// import { listUserAsync, listUserSync } from '../Redux/actions/actionsRegister';
import { useDispatch, useSelector } from 'react-redux';
import { authentication } from '../Firebase/firebaseConfig';
import { indexedDBLocalPersistence, updateProfile } from 'firebase/auth';
import useForm from '../hooks/useForm';
import { editUserAsync, editUserSync } from '../Redux/actions/actionsRegister';

const Profile = () => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(listUserAsync())
    // }, [dispatch])

   const user = useSelector(store => store.loginStore)
       
    console.log(user)
// const user = useSelector(store => store.regisUserStore)
       
// console.log(user)

    
    const [formValue, handleInputChange] = useForm({
        displayName: user.displayName,
        email: user.email,
        photoURL : user.photoURL
    })

    const {displayName, email, photoURL} = formValue

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(displayName, email,  photoURL)

        dispatch(editUserAsync(displayName, email, photoURL))
     
    }

    const handleFileChange =(e)=>{
        // const file= e.target.files[0]
        // //llamar a la configuracion de Cloudinary
        // FileUpload(file)
        // .then((resp)=>{
        //     formValue.imagen = resp
        //     console.log(resp)
        // })
        // .catch((error)=>{console.warn(error)});
 
     }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Profile</h1>
            <p>change or update your info user.</p>
            <div style={{ borderRadius: '100%' }}>
            </div>
            {
              
                    <form onSubmit={handleSubmit} style={{ justifyContent: 'center' }}>
                                        <img width={70} src={user.photoURL} alt="" style={{ borderRadius: '100%' }} />
                                        <input type="file" name="photoURL" onChange={handleFileChange}/>

                    <h5>Your name</h5>
                   
                    <input type="text" name="displayName" value={formValue.displayName} onChange={handleInputChange} />
                    
                    <h5>Your Email</h5>
                   
                    <input type="text" name="email" value={formValue.email} onChange={handleInputChange}/>
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