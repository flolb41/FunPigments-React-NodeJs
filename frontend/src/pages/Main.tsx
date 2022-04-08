import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Main: FunctionComponent = () => {
  return (
    <div className="container">
      <h2 className="welcome">Bienvenue sur Funpigments</h2>
      <p>Inscrivez-vous pour continuer !! N'hésitez pas c'est gratuit !!</p>
      <div className="connection">
        <Link to="/register" className="waves-effect waves-light btn-large">
          Inscription
        </Link>
        <Link to="/login" className="waves-effect waves-light btn-large">
          Connexion
        </Link>
      </div>
    </div>
  );
};

export default Main;
