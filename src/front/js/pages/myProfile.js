import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


export const MyProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!actions.isLoggedIn()) {
            navigate('/login')
        } else {
            actions.getProfileInfo()
        }
    }, [])

    return (
        <>
            <h1>Mi perfil</h1>
            <p>{store.userInfo?.email}</p>
            <p className="text-red">{store.error}</p>
        </>
    );
};
