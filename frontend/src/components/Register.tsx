import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authentication-service";

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
  thumbnail: Field;
};

const Register: FunctionComponent = () => {
  const [form, setForm] = useState<Form>({
    username: { value: "" },
    password: { value: "" },
    email: { value: "" },
    city: { value: "" },
    thumbnail: { value: "" }
  });

  const [message, setMessage] = useState<String>("Vous n'êtes pas encore inscrit.");

  
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
    if (form.password.value.length < 3) {
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
      setMessage("Tentative de connexion en cours...");
      AuthService.register(form.username.value, form.password.value, form.email.value, form.city.value, form.thumbnail.value)
        .then((isAuthenticated) => {
          if (!isAuthenticated) {
            setMessage("Le pseudo ou le mot de passe est incorrect.");
            return;
          } else {
            navigate("/home");
          }
        })
        .catch((err: any) => {
          setMessage(err.response.data.message);
        });
    }
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            <div className="card-stacked">
              <div className="card-content">
                {message && (
                  <div className="form-group">
                    <div className="card-panel grey lighten-5">{message}</div>
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="username">Pseudo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={form.username.value}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {form.username.error && (
                    <div className="card-panel red accent-1">
                      {form.username.error}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={form.password.value}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {form.password.error && (
                    <div className="card-panel red accent-1">
                      {form.password.error}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.email.value}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {form.email.error && (
                    <div className="card-panel red accent-1">
                      {form.email.error}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="city">Ville</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={form.city.value}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {form.city.error && (
                    <div className="card-panel red accent-1">
                      {form.city.error}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="thumbnail">Photo de profile</label>
                  <input
                    type="file"
                    className="form-control"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={(e) => handleInputChange(e)}
                  />
                  {form.thumbnail.error && (
                    <div className="card-panel red accent-1">
                      {form.thumbnail.error}
                    </div>
                  )}
                </div>
              </div>
              <div className="card-action center">
                <button type="submit" className="btn btn-primary">
                  Inscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
