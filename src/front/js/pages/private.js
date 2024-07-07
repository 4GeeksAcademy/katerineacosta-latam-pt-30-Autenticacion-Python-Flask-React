import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if (!actions.isLoggedIn()) {
			navigate('/login')
		}
	}, [])
	return (
		<div className="container">
			<h1>Ruta secreta</h1>
		</div>
	);
};
