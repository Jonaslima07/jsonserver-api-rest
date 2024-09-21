import React, { useState } from "react" // importa os Hooks useState 
import DropComapies from "./DropCompanies" //importa o componente DropComapies

const Form = ({ userData = {}, postUser, updateUser }) => { // cria um componente funcional Form 
	 // é declarado o estado user e a função atualizadora.
	const [user, setUser] = useState({  // cada variavel é iniciada utilizando dados do Props, sendo ele o userData.
		name: userData.name ?? "",   
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	})
	
	const handleValue = e => { // função em que é executada assim que chamada quando alguém for submeter algo nos inputs
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	
	const submitUser = e => { // função em que é execuatada para adicionar ou atualizar usuarios 
		e.preventDefault()
		
		if (user.companiesId === "0") return // se essa condição for igual a 0, não sera criado e nem atualizado usuarios
		
		if (userData.id) { // se for informado o id do usuario, ira ocorrer aatualização de dados dele
			updateUser(userData.id, user)
		} else { // se não, será apenas criado um novo usuario
			postUser(user)
		}
	}

	return ( // componente formulário para a execução

		<form onSubmit={submitUser} className='row'>
			{/* inputs onde é definido ostipos de entradas de dados */}
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			{/* componente DropComapies, passando como parametro os Props para a escolha de empresas */}
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}
// exporta o componente funcional Form
export default Form
