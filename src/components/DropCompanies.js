import React, { useState, useEffect } from "react" // importa os Hooks useState e useEffect
import { httpHelper } from "../helpers/httpHelper" // importação do httpHelper que é um conjunto de funções onde facilita a interação com a API.

const DropCompanies = ({ companiesId, handleValue }) => { // cria o componente funcional DropCompanies, que recebe os atributos Props como parâmetros.
	
	const [companies, setCompanies] = useState(null) // é declarado o estado companies e a função atualizadora setCompanies.
	const [company, setCompany] = useState(companiesId) // é declarado o estado company e a função atualizadora setCompany.

	const url = "http://localhost:5000/companies" // url da API que recebe o endpoint 
	const api = httpHelper() // variável que instancia httpHelper, onde a mesma contém os metódos para interagir com a API.

	useEffect(() => { // o useEffect é utilizado para carregar os dados de Companies
		api
			.get(url)
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res]) // cria um objeto com o id = 0 e realiza o espalhamento em 'resp'
			})
			.catch(err => console.log(err)) // promessa de resposta da requisição, onde irá retornar a resposta de erro no console se houver.
	}, [])

	if (!companies) return null // este if é utilizado para não redenrizar o componente na interface até que tenha carregado os dados da API

	return (
		<select 
		// retorna um elemento select, onde será possivel escolher uma empresa das empresas disponiveis
			name='companiesId'
			value={company}
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}>
			{/* o map interage na lista de companies, contendo um callback como parametro para redenrizar cada option para cada empresa */}
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}
// exporta o componente funcional DropCompanies
export default DropCompanies
