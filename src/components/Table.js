import React from "react" // importa a biblioteca React
import Form from "./Form" // importa o componente Form

const Table = ({ users, postUser, updateUser, deleteUser }) => { // componente funcional em que é passado na arrow function, os Props a serem utilizados
	const showUpdateUser = id => { // função para exibir o formulário para o usuario
		const form = document.getElementsByClassName(`show-form-${id}`) // função form captura classes atraves do id
		form[0].classList.toggle("hide-form")
	}
	
	const Row = ({ user }) => { // componente que é utilizada para linha da tabela, utilizando a arrow function passando user como parametro
		return (
			<>
				<div className='row'> 
					{/* div em que recebe os dados do usuario */}
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'> 
						{/* funções atribuida aos botões para atualizar e deletar usuario */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				{/* formulario para atualização de dados do usuario */}
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	return (
		<div className='table'>  {/* div que exibi dados do usuario  */}
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'>
				{/* através do map é interado todos os dados que tem em usuario */}
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}
// exporta o componente funcional Table
export default Table
