import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";


import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleOnChange = (event, key) => {
        setUser({ ...user, [key]: event.target.value })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await actions.login(user.email, user.password);
        const token = sessionStorage.getItem('token');
        if (!store.error && token) {
            navigate("/private")
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={(e) => (handleOnChange(e, 'email'))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => (handleOnChange(e, 'password'))} />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};
