export const httpHelper = () => {
	const customFetch = async (url, options = {}) => { {/*função assincrona para enviar requisições, nesse caso será do metódo GET*/}
		const defaultMethod = "GET" // metódo HTTP, que quando é solicitado a requisição, ele busca informações sobre.
		const defaultHeaders = {
			"Content-Type": "application/json", // conteudo enviado é um Json
			Accept: "application/json",
		}
		
		const controller = new AbortController() // variavel que instância o obejto AbortController
		options.signal = controller.signal // variavel que recebe sinal do AbortController
		
		options.method = options.method || defaultMethod // define o metodo da requisição, quando passa options.method
		options.headers = options.headers //  a variavel options.headers desestrutura os componentes de defaultHeaders e options.headers, caso tenha algo passado 
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders
		// a variavel options.body recebe o Json do body caso tenha algo
		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body // se não tiver dados, deleta o objeto options

		setTimeout(() => { // cancela a requisiçao apos 3 segundos, caso não tenha sido concluida
			controller.abort()
		}, 3000)

		try { // utiliza o try e catch para tratar erros, nesse caso tenta realizar uma requisição, utlizando fetch para realizar um request.
			const response = await fetch(url, options)
			return await response.json() // retorna a resposta da promessa
		} catch (err) { // retorna a mensagem de erro caso ocorra algum erro
			return err 
		}
	}
	// função para capturar os dados da API 
	const get = (url, options = {}) => customFetch(url, options)
	// função de criar/cadastrar na API
	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}
	// função de atualizar os dados da API
	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}
	// função de deletar dados da API
	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}
	// retorna as funções utilizadas acima
	return {
		get,
		post,
		put,
		del,
	}
}
