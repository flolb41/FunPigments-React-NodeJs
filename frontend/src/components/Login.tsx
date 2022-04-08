import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authentication-service";


type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  username: Field,
  password: Field
};

const Login = () => {

  const [form, setForm] = useState<Form>({
    username: { value: "" },
    password: { value: "" }
  });

  const [message, setMessage] = useState<String>("Vous êtes déconnecté.");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };
    
    setForm({ ...form, ...newField });
  };

  const validateForm = () => {
    let newForm: Form = form;
    
    // Validate username
    if (form.username.value.length < 3) {
      const errorMessage: string = "Le pseudo doit contenir au moins 3 caractères.";
      const newField: Field = { value: form.username.value, error: errorMessage, isValid: false }
      newForm = { ...form, username: newField };
    } else {
      const newField: Field = { value: form.username.value, error: '', isValid: true }
      newForm = { ...newForm, username: newField };
    }

    // Validate password
    if (form.password.value.length < 3) {
      const errorMessage: string = "Le mot de passe doit contenir au moins 6 caractères.";
      const newField: Field = { value: form.password.value, error: errorMessage, isValid: false }
      newForm = { ...form, password: newField };
    } else {
      const newField: Field = { value: form.password.value, error: '', isValid: true }
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
      setMessage("Tentative de connexion en cours...");
      /*AuthService.login(form.username.value, form.password.value)    
        .then(() => {
          if (AuthService.isAuthenticated === true) {
            setMessage("Vous êtes connecté.");
            navigate("/");
          } else {
            setMessage("Le pseudo ou le mot de passe est incorrect.");
            return
          }
        })
        .catch((err: any) => {
          setMessage(err.response.data.message);
        });
    }*/
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {message && <div className="form-group">
                  <div className="card-panel grey lighten-5">
                    {message}
                  </div>
                </div>}
                <div className="form-group">
                  <label htmlFor="username">Pseudo</label>
                  <input type="text" className="form-control" id="username" name="username" value={form.username.value} onChange={(e) => handleInputChange(e)} />
                  {form.username.error && <div className="card-panel red accent-1">
                    {form.username.error}
                  </div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input type="password" className="form-control" id="password" name="password" value={form.password.value} onChange={(e) => handleInputChange(e)} />
                  {form.password.error && <div className="card-panel red accent-1">
                    {form.password.error}
                  </div>}
                </div>
              </div>
              <div className="card-action center">
                <button type="submit" className="btn btn-primary">Connexion</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login; 