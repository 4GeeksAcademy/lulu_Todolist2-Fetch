import React, { useEffect, useState } from "react";



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	const changeInputValue = (e) => { setInputValue(e.target.value) };

	const inputKeyPress = (event) => {
		const updateValue = {
			done: true,
			label: inputValue
		}
		if (event.key === "Enter") {
			setTodos([...todos, updateValue])
			updateTodo() 
			setInputValue("")  
		}
	};

	const deleteEvent = (index) => {
		const listaActualizada = todos.filter((t, currentIndex) => index !== currentIndex)
		setTodos(listaActualizada)
	}

	const deleteEventAll = () => {
		setTodos([]);
	};

	//	fetch code.....// se que he creado mi usuario... pero realmente no entiendo el resto.... 
	// no se como hacerle sync con mi todo list o lo que se supone que tiene que poner... 

	const urlTodos = "https://playground.4geeks.com/apis/fake/todos/user/lulu828";



	useEffect(() => {
		getTask()
	}, [])

	const getTask = () => {
		fetch(urlTodos)
		
			.then((response) => response.json())
			.then((todos) => setTodos(todos))
			.catch((err) => err);
	};

	/* useEffect(() => {
		newTask()
	}, [todos]); */

	//POST//

	const newTask = () => {
		fetch(urlTodos, {
			method: "POST",
			body: JSON.stringify(todos),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				console.log(response)
				return response.json() })
			.then((data) => { console.log(data) })
			.catch((err) => { console.log(err) })

	};

	const updateTodo = () => {
		console.log("hola!!!!!")
		const newTodo = {
			done: false,
			label: inputValue
		} 

		// PUT // 
		
		fetch(urlTodos, {
			method: "PUT",
			body: JSON.stringify([...todos, newTodo]),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => { 
				console.log(response)
				return response.json() })
			.then((data) => {
				 setTodos([...todos, newTodo])
				 console.log(data) })
			.catch((err) => { console.log(err) })

	}
 
	//COMO HAGO SYNC ENTRE FETCH Y HTML

	return (
		<div className="container text-center">
			<h1>My todos </h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder="Where is the info from the API?..."
						value={inputValue} /* {fetch} *//*  {urlTodos} */
						onChange={changeInputValue} 
						onKeyDown={inputKeyPress} />

					<button type="button" className="btn btn-success btn-sm" onClick={updateTodo}>Enter</button> 

				</li>
				
				{todos.map((value, index) => (
					<li key={index}
						style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} >
						{/* {console.log(value.label)} */}
						{value.label}
						
						<button
							className="btn btn-danger"
							onClick={() => deleteEvent(index)}>X</button>
					</li>
					
				))}
			</ul>
			<div className="divCenter d-flex justify-content-center m-3">
				<button className="btn btn-warning" onClick={deleteEventAll}>Delete All</button>
			</div>

			<div className="etiqueta form-control col-2 btn btn-success" style={{ width: '100px' }}>{todos.length} item left</div>
		</div>
	);
};

export default Home;
	