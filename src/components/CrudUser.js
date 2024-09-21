// importa os Hooks useState e useEffect
import React, { useState, useEffect } from "react"
// importa o componete Form
import Form from "./Form"
// importa o componente Table
import Table from "./Table"
// importação do httpHelper que é um conjunto de funções onde facilita a interação com a API.
import { httpHelper } from "../helpers/httpHelper"

// componente funcional CrudUser
const CrudUser = () => {
	// é declarado o estado users e a função atualizadora setUsers.
	const [users, setUsers] = useState(null)
	// variável que recebe a url da api
	const url = "http://localhost:5000/users"
	// variável que instancia httpHelper, onde a mesma contém os metódos para interagir com a API.
	const api = httpHelper()
	// o useEffect é utilizado para que quando a página for recarregada, ele capturar os usuários cadastrados.
	useEffect(() => {
		getUsers()
	}, [])

	// função onde adiciona(post) usuários
	const postUser = user => {
		api
			.post(`${url}`, { body: user })   // é enviado uma requisição para inserir usuário, com os dados fornecidos
			.then(res => getUsers()) // promessa que ao ser feita, executa(carrega) a lista usuario, após ter adicionado um usuário.
			.catch(err => console.log(err)) // retorna uma mensagem de erro da requisição no console 
	}
	
	// função onde acontece um update(atualiza) nos dados do usuário
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user }) // é enviado uma requisição para atualizar os dados do usuário, atraves do id
			.then(res => getUsers()) // promessa que ao ser feita, executa(carrega) a lista usuario, após ter atualizado os dados de um usuário.
			.catch(err => console.log(err)) // retorna uma mensagem de erro da requisição no console 
	}

	// função de deletar usuário
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {}) // é enviado uma requisição para excluir um usuário atraves do id informado.
			.then(res => getUsers()) // promessa que ao ser feita, executa(carrega) a lista usuario, após ter excluido os dados de um usuário.
			.catch(err => console.log(err)) // retorna uma mensagem de erro da requisição no console 
	}
	// função para buscar todos os usuários que foram inseridos.
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			}) // atualiza os dados do usuario quando a promessa for feita
			.catch(err => console.log(err)) // retorna uma mensagem de erro da requisição no console
	}

	if (!users) return null // este if é utilizado para não redenrizar o componente na interface até que tenha carregado os dados da API

	return (
		<>
			<h3>New user</h3>

			{/* componente formulário para adicionar novos usuários */}

			<Form postUser={postUser} />
			<div className='all-users'>
				<h3>All users</h3>
				
				{/* componente Table que recebe os atributos Props */}
				
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	)
}
// exporta o componente funcional CrudUser
export default CrudUser
