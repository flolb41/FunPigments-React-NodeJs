import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to={'/'} />
    }
    return (
        <div className="container">
            <h2 className="welcome">Bienvenue sur Funpigments</h2>
            <p>Vous etes déconnecté !!</p>
            <form onSubmit={handleSubmit}>
                <button className="waves-effect waves-light btn-large">
                    Connexion
                </button>
            </form>
        </div>
    );
}

export default Logout;