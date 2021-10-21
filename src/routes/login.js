import Logo from '../components/logo';
import { PageContainer } from '../components/Containers';
import CustomForm from '../components/inputs/CustomForm';
import FakeLink from '../components/FakeLink';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../routes/routes';
import { postLogin } from '../services/api';
import statusCode from '../services/statusCode';

export default function Login() {
	const history = useHistory();
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

	function formSubmit(event) {
		setLoading(true);

		event.preventDefault();

		postLogin(inputs)
			.then(response => {
				history.push(routes.transactions);
			})
			.catch(error => {
				let responseStatusCode = error.response.status;
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

			<CustomForm
				formInfos={inputs}
				formSubmit={formSubmit}
				saveInputsState={setInputs}
			/>

			<FakeLink to={routes.signUp} loading={loading}>
				Primeira vez? Cadastre-se!
			</FakeLink>
		</PageContainer>
	);
}

const saveUserAtLocalStorage = user =>
	localStorage.setItem('MyWalletUser', JSON.stringify(user));

const getUserFromLocalStorage = () =>
	JSON.parse(localStorage.getItem('MyWalletUser'));
