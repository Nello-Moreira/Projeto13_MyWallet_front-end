import Logo from '../components/logo';
import { PageContainer } from '../components/Containers';
import CustomForm from '../components/inputs/CustomForm';
import CustomInput from '../components/inputs/CustomInput';
import StandardButton from '../components/buttons/StandardButton';
import FakeLink from '../components/FakeLink';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../routes/routes';
import { postLogin } from '../services/api';
import statusCode from '../services/statusCode';

export default function Login() {
	const [inputs, setInputs] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function inputModifier(event, fieldName) {
		inputs[fieldName] = event.target.value;
		setInputs({ ...inputs });
	}

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
			<CustomForm onSubmit={formSubmit}>
				<CustomInput
					value={inputs.email}
					onChange={
						loading ? null : event => inputModifier(event, 'email')
					}
					placeholder='Email'
					loading={loading}
					type='email'
					required
				/>

				<CustomInput
					value={inputs.password}
					onChange={
						loading
							? null
							: event => inputModifier(event, 'password')
					}
					placeholder='Senha'
					loading={loading}
					type='password'
					required
				/>

				<StandardButton type='submit' loading={loading}>
					Entrar
				</StandardButton>
			</CustomForm>
			<FakeLink to={routes.signUp} loading={loading}>
				Primeira vez? Cadastre-se!
			</FakeLink>
		</PageContainer>
	);
}
