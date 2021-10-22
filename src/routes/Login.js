import Logo from '../components/Logo';
import { PageContainer } from '../components/Containers';
import CustomForm from '../components/inputs/CustomForm';
import FakeLink from '../components/FakeLink';
import CircleLoader from '../components/loaders/CircleLoader';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from './routes';

import { postLogin } from '../services/api';
import statusCode from '../services/statusCode';

export default function Login({ setUser }) {
	const history = useHistory();
	const [pageFirstLoad, setPageFirstLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState([
		{ field: 'email', type: 'email', value: '', placeholder: 'Email' },
		{
			field: 'password',
			type: 'password',
			value: '',
			placeholder: 'senha',
		},
	]);

	useEffect(() => {
		const loginData = getUserFromLocalStorage();

		if (loginData) {
			setUser(loginData);
			history.push(routes.transactions);
		}

		setPageFirstLoad(false);
	}, []);

	function formSubmit(event) {
		setLoading(true);

		event.preventDefault();

		const email = inputs.find(inp => inp.field === 'email').value;
		const password = inputs.find(inp => inp.field === 'password');

		postLogin({ email, password: password.value })
			.then(response => {
				const loginData = response.data;

				saveUserAtLocalStorage(loginData);
				setUser(loginData);

				history.push(routes.transactions);
			})
			.catch(error => {
				let text;

				switch (error.response.status) {
					case statusCode.badRequest:
						text = 'Email ou senha inválido';
						break;

					case statusCode.unauthorized:
						text = 'A senha digitada está errada';
						break;

					case statusCode.notFound:
						text =
							'Usuário não cadastrado. Por favor, registre-se.';
						break;

					default:
						text =
							'Houve um erro ao realizar o login. Por favor, tente novamente.';
						break;
				}
				alert(text);
				setLoading(false);
			});
	}

	return (
		<PageContainer>
			<Logo />

			{pageFirstLoad ? (
				<CircleLoader />
			) : (
				<>
					<CustomForm
						formInfos={inputs}
						formSubmit={formSubmit}
						saveInputsState={setInputs}
						loading={loading}
						buttonText='Entrar'
					/>

					<FakeLink
						to={routes.signUp}
						loading={loading}
						customStyle={{ margin: '30px 0 0' }}
					>
						Primeira vez? Cadastre-se!
					</FakeLink>
				</>
			)}
		</PageContainer>
	);
}

const saveUserAtLocalStorage = user =>
	localStorage.setItem('MyWalletUser', JSON.stringify(user));

const getUserFromLocalStorage = () =>
	JSON.parse(localStorage.getItem('MyWalletUser'));
