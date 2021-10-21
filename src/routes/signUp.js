import Logo from '../components/logo';
import { PageContainer } from '../components/Containers';
import CustomForm from '../components/inputs/CustomForm';
import CustomInput from '../components/inputs/CustomInput';
import StandardButton from '../components/buttons/StandardButton';
import FakeLink from '../components/FakeLink';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../routes/routes';
import { postSignUp } from '../services/api';
import statusCode from '../services/statusCode';

export default function SignUp() {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		passwordCheck: '',
		name: '',
	});
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function inputModifier(event, fieldName) {
		inputs[fieldName] = event.target.value;
		setInputs({ ...inputs });
	}

	function formSubmit(event) {
		setLoading(true);

		event.preventDefault();

		if (!samePassword(inputs.password, inputs.passwordCheck)) {
			setInputs({ ...inputs, password: '', passwordCheck: '' });
			alert(
				'As senhas inseridas não conferem. Por favor, insira as senhas novamente.'
			);
			setLoading(false);
			return;
		}

		postSignUp(inputs)
			.then(response => {
				alert('Usuário cadastrado com sucesso.');
				setInputs({
					email: '',
					password: '',
					passwordCheck: '',
					name: '',
				});
				setLoading(false);
			})
			.catch(error => {
				let text;

				switch (error.response.status) {
					case statusCode.badRequest:
						text = 'Email ou senha inválido';
						break;

					default:
						text =
							'Houve um erro ao realizar o cadastro. Por favor, tente novamente.';
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
					value={inputs.name}
					onChange={
						loading ? null : event => inputModifier(event, 'name')
					}
					placeholder='Nome'
					loading={loading}
					type='text'
					required
				/>

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

				<CustomInput
					value={inputs.passwordCheck}
					onChange={
						loading
							? null
							: event => inputModifier(event, 'passwordCheck')
					}
					placeholder='Confirme sua senha'
					loading={loading}
					type='password'
					required
				/>

				<StandardButton type='submit' loading={loading}>
					Cadastrar
				</StandardButton>
			</CustomForm>

			<FakeLink to={routes.login} loading={loading}>
				Já tem uma conta? Entre agora!
			</FakeLink>
		</PageContainer>
	);
}

const samePassword = (password, passwordCheck) => password === passwordCheck;
