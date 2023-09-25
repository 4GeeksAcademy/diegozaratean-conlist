const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			deleteContact: (indexDelete) => {
				console.log('deleteContact')
				console.log('eliminar' + indexDelete)
				console.log('idEliminar' + indexDelete)
				// //get the store
				// const store = getStore();
				// console.log(store.contacts)		
				// console.log(store.contacts.filter( (item,index) => index != indexDelete))	

				// // setStore({ contacts:  store.contacts.filter( (item,index) => index != indexDelete) });

				// setStore({ contacts: store.contacts.filter( (item,index) => index != indexDelete) });


				var requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
				  };
				  
				fetch("https://playground.4geeks.com/apis/fake/contact/" + indexDelete, requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.then(()=> {
					console.log("se termino")
					console.log("el proceso")
					fetch('https://playground.4geeks.com/apis/fake/contact/agenda/contactos21')
					.then((response) => response.json())
					// .then((data) => console.log(data))
					.then((data) => setStore({ contacts: data }))
				})
				.catch(error => console.log('error', error));

			},
			loadSomeData: () => {
				console.log('loadSomeData')
				// setStore({ contacts: [
				// 	{
				// 		full_name: "f desde fluxjs loadSomeData ",
				// 		email: "f@gmail.com"
				// 	},
				// 	{
				// 		full_name: "e desde fluxjs loadSomeData",
				// 		email: "e@gmail.com"
				// 	}
				// ] });

				fetch('https://playground.4geeks.com/apis/fake/contact/agenda/contactos21')
				.then((response) => response.json())
				// .then((data) => console.log(data))
				.then((data) => setStore({ contacts: data }))
				



				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
