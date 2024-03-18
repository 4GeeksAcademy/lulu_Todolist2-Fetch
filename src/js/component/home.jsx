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
		method="GET"
		
			.then((response) => response.json())
			.then((data) => setTodos(data))
			.catch((err) => err);
	};

	useEffect(() => {
		newTask()
	}, [todos]);

	//POST//

	const newTask = () => {
		fetch(urlTodos, {
			method: "POST",
			body: JSON.stringify(todos),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => { return response.json() })
			.then((data) => { console.log(data) })
			.catch((err) => { return err })
	};

	const updateTodo = () => {
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
			.then((response) => { return response.json() })
			.then((data) => { console.log(data) })
			.catch((err) => { return err })

	}


	return (
		<div className="container text-center">
			<h1>My todos </h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder="What do you need to do?"
						value={inputValue}
						onChange=/* {changeInputValue} */ {urlTodos}
						onKeyDown={inputKeyPress} />

					<button type="button" class="btn btn-success btn-sm onClick={addtotodolist}">Enter</button>

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
	