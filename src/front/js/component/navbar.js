import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const logout = () => {
		actions.logout();
		navigate("/")
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!actions.isLoggedIn() && <Link to="/login">
						<button className="btn btn-primary">Iniciar sesion</button>
					</Link>}
					{actions.isLoggedIn() && <Link to="/myprofile">
						<button className="btn btn-primary mx-2">Mi perfil</button>
					</Link>}
					{actions.isLoggedIn() && <button className="btn btn-primary" onClick={logout}>Cerrar sesión</button>}
				</div>
			</div>
		</nav>
	);
};
