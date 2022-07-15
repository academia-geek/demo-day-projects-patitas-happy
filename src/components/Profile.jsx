import React from 'react';

const Profile = () => {
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <h1>Profile</h1>
            <p>change or update your info user.</p>
            <img src="" alt="" />
            <form style={{justifyContent:'center'}}>
                <h5>Your name</h5>
                <input type="text" />
                <h5>Your name</h5>
                <input type="text" />
                <h5>Your name</h5>
                <input type="text" /> <br />
                <button>Aceptar</button>
            </form>
        </div>
    );
};

export default Profile;