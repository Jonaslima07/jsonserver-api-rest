import { LogoIcon } from "./assets/icons" // importa a biblioteca icons
import CrudUser from "./components/CrudUser"// importa o componte CrudUser
import "./styles/App.css" // importa os CSS da apliacação

function App() { // componente funcional App
	return (
		<>
			<header>  {/*cabeçalho da aplicação*/}
				<div className='header__content'> {/* container principal do conteudo do cabeçalho */}
					<div className='logo'>
						<LogoIcon />
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>
			<main>
				{/*componente principal onde será chamada o CrudUser*/}
				<CrudUser />
			</main>
		</>
	)
}

export default App
