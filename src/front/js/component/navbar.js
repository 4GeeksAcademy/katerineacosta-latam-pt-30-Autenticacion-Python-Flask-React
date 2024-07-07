import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const logout = () => {
		actions.logout();
		navigate("/login")
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					{actions.isLoggedIn() && <button className="btn btn-primary" onClick={logout}>cierre de sesión</button>}
				</div>
			</div>
		</nav>
	);
};
