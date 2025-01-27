const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			error: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ ...getStore(), message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {

				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ ...getStore(), demo: demo });
			},
			signup: async (email, password) => {
				setStore({ ...getStore(), error: null });
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/signup', {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email, password
						})
					});
					const data = await resp.json();
					setStore({ ...getStore(), message: data.message });

				} catch {
					setStore({ ...getStore(), error: "Error creating user" });
				}
			},
			login: async (email, password) => {
				setStore({ ...getStore(), error: null });
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/login', {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email, password
						})
					});
					const data = await resp.json();
					setStore({ ...getStore(), message: data.message });
					if (data.token) {
						sessionStorage.setItem('token', data.token);
					}
				} catch {
					setStore({ ...getStore(), error: "Error in login" });
				}
			},
			logout: () => {
				sessionStorage.removeItem('token')
			},
			isLoggedIn: () => {
				const token = sessionStorage.getItem('token');
				return !!token;
			},
			getProfileInfo: async (email, password) => {
				setStore({ ...getStore(), error: null });
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/profileInfo', {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + sessionStorage.getItem('token')
						},
					});
					const data = await resp.json();
					setStore({ ...getStore(), userInfo: data });

				} catch {
					setStore({ ...getStore(), error: "Error obteniendo informacion de usuario" });
				}
			},
		}
	};
};

export default getState;
