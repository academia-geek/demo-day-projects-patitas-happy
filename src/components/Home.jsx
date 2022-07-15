import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            Estoy en home
            <Link to={"/mascotas"}>Ir a Mascotas</Link>
        </div>
    );
};

export default Home;