import React, { FunctionComponent } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const AuthPage: FunctionComponent = () => {
    return (
      <div className="Authentication">
        <h1 className='center'>Bienvenue sur Funpigments</h1>
        <p>Inscrivez-vous !! C'est gratuit et rapide !!</p>
        <div className="connection">
          <Link to="/login" className="btn btn-primary">
            Se connecter
          </Link>
          <Link to="/register" className="btn btn-primary">
            S'inscrire
          </Link>
        </div>
      </div>
    );
};

export default AuthPage;