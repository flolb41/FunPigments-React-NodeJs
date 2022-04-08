import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const pageNotFound: FunctionComponent = () => {
    return (
        <div>
            <h2>Votre page n'existe pas</h2> 
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
};

export default pageNotFound;