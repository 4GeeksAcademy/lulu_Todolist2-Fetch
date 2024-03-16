import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

function App(){
	//hook---//
const [newItem, setNewItem] = useState("");
//-- array con toos los items//
const[items, setItems] = useState ([]);

//adding Fetch //

//GET//

const getInfo = () => {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
		method: "GET",
	})
	console.log(resp.ok);
	console.log(resp.status);
	if (resp.status === 400){
		console.log('create nuevo usuario')
		createUser()};
		return resp.json();
	}


const putInfo = () => {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        // Manejo de errores
        console.log(error);
    });

};

//POST//
const createUser = () => {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
	method: "POST",
	body: JSON.stringify(todos),
	headers: {
		"Content-Type": "application/json"
	}

}

//-- funcion con alerta si no escriben//
function addItem() {
	if (!newItem){
		alert("Enter a item.");
		return;
	}

	//helper function//

	const item = {
		id: Math.floor(Math.random() * 100),
		value: newItem
};

//variar items from old to new adds.//


setItems(oldList => [...oldList, item]); //old list mas el item nuevo//
setNewItem(""); //new item back to empty string up on array
}

	function deleteItem(id){
		const  newArray = items.filter(item =>item.id !== id);
		setItems(newArray);
		

	}


	return (
		<div className="App text-center">

			<h1> To do List</h1>

		<input
		type = "text"
		placeholder="What to do..."
		value={newItem}
		onChange={e => setNewItem(e.target.value)}
		/>

		<button onClick={() => addItem ()}>Add</button>

		<ul>

			{items.map(item => {

				return(
					<li key={item.id}><strong>
						{item.value}</strong>
					<button onClick={() => deleteItem(item.id)}>
						<i className="fa-solid fa-trash"></i></button>
					
					</li>
				)
			})}
		</ul>
		<div> # of tasks.</div>
		</div>
	);
}

export default App;
