import React, { useState } from 'react';
import AuthService from '../services/authentication-service';
import { useNavigate, Navigate } from 'react-router-dom';


type Field = {
    value?: any;
    error?: string;
    isValid?: boolean;
};

type Form = {
    username: Field;
    password: Field;
    email: Field;
    city: Field;
};

const Profile = () => {
  
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [form, setForm] = useState<Form>({
        username: { value: "" },
        password: { value: "" },
        email: { value: "" },
        city: { value: "" }
    });

    const [message, setMessage] = useState<String>("Vous êtes déconnecté.");

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const fieldName: string = e.target.name;
      const fieldValue: string = e.target.value;
      const newField: Field = { [fieldName]: { value: fieldValue } };

      setForm({ ...form, ...newField });
    };

    const validateForm = () => {
      let newForm: Form = form;

      // Validate username
      if (form.username.value.length < 3) {
        const errorMessage: string =
          "Le pseudo doit contenir au moins 3 caractères.";
        const newField: Field = {
          value: form.username.value,
          error: errorMessage,
          isValid: false,
        };
        newForm = { ...form, username: newField };
      } else {
        const newField: Field = {
          value: form.username.value,
          error: "",
          isValid: true,
        };
        newForm = { ...newForm, username: newField };
      }

      // Validate password
      if (form.password.value.length < 6) {
        const errorMessage: string =
          "Le mot de passe doit contenir au moins 6 caractères.";
        const newField: Field = {
          value: form.password.value,
          error: errorMessage,
          isValid: false,
        };
        newForm = { ...form, password: newField };
      } else {
        const newField: Field = {
          value: form.password.value,
          error: "",
          isValid: true,
        };
        newForm = { ...newForm, password: newField };
      }

      setForm(newForm);

      return newForm.username.isValid && newForm.password.isValid;
    };

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
        if (isFormValid) {
            setMessage("Mise à jour en cours...");
            AuthService.updateUser(user.username, user.password, user.email, user.city, user.thumbnail)
            .then(() => {
                setMessage("Votre profil a bien été mis à jour.");
                return;
            })   
        .catch((err: any) => {
          setMessage(err.response.data.message);
        });
    }
    };

    const deleteUser = () => {
        AuthService.deleteUser(user.id);
        }
   

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <img src={user.thumbnail} alt={user.thumbnail} className="thumbnail" />        
                    <span className="card-title">{user.username}</span>
                    <p>{user.email}</p>
                    <p>{user.city}</p>
                    <p>{user.isAdmin}</p>
              </div>
              <div className="update-profile">
                <form className="container" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={form.username.value} onChange={(e) => handleInputChange(e)} />
                        {form.username.error && <div className="card-panel red accent-1">
                            {form.username.error}
                        </div>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" value={form.password.value} onChange={(e) => handleInputChange(e)} />
                        {form.password.error && <div className="card-panel red accent-1">
                            {form.password.error}
                        </div>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={form.email.value} onChange={(e) => handleInputChange(e)} />
                        {form.email.error && <div className="card-panel red accent-1">
                            {form.email.error}
                        </div>}
                  </div>
                    <div className="input-field">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" name="city" value={form.city.value} onChange={(e) => handleInputChange(e)} />
                        {form.city.error && <div className="card-panel red accent-1">
                            {form.city.error}
                        </div>}
                  </div>
                </form>
              </div>
              <div className="card-action">
                <button
                   type='submit'
                  className="btn waves-effect waves-light"
                >
                  Mettre à jour
                </button>
                <button
                  onClick={deleteUser}
                  className="btn waves-effect waves-light red"
                >
                  Supprimer le compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;