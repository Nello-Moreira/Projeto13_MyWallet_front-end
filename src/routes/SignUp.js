import Logo from '../components/Logo';
import { PageContainer } from '../components/Containers';
import CustomForm from '../components/inputs/CustomForm';
import FakeLink from '../components/FakeLink';
import routes from './routes';

import { useState } from 'react';

import { postSignUp } from '../services/api';
import statusCode from '../services/statusCode';

import { resetInputsValues } from '../helpers';

export default function SignUp() {
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState([
		{
			field: 'name',
			type: 'text',
			value: '',
			placeholder: 'Nome',
		},
		{ field: 'email', type: 'email', value: '', placeholder: 'Email' },
		{
			field: 'password',
			type: 'password',
			value: '',
			placeholder: 'Senha',
		},
		{
			field: 'passwordCheck',
			type: 'password',
			value: '',
			placeholder: 'Confirme a senha',
		},
	]);

	function formSubmit(event) {
		setLoading(true);

		event.preventDefault();

		const password = inputs.find(inp => inp.field === 'password');
		const passwordCheck = inputs.find(inp => inp.field === 'passwordCheck');

		if (!samePassword(password.value, passwordCheck.value)) {
			const newInputsState = inputs.map(inp => {
				if (inp.field === 'password' || inp.field === 'passwordCheck') {
					inp.value = '';
				}
				return inp;
			});

			setInputs(newInputsState);
			setLoading(false);

			alert(
				'As senhas inseridas não conferem. Por favor, insira as senhas novamente.'
			);
			return;
		}

		const name = inputs.find(inp => inp.field === 'name').value;
		const email = inputs.find(inp => inp.field === 'email').value;

		postSignUp({ name, email, password: password.value })
			.then(response => {
				alert('Usuário cadastrado com sucesso.');

				setInputs(resetInputsValues(inputs));

				setLoading(false);
			})
			.catch(error => {
				let text;

				switch (error.response.status) {
					case statusCode.badRequest:
						text = 'Email ou senha inválido';
						break;

					case statusCode.conflict:
						text = 'Este e-mail já está em uso';
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

			<CustomForm
				formInfos={inputs}
				formSubmit={formSubmit}
				saveInputsState={setInputs}
				loading={loading}
				buttonText='Cadastrar'
			/>

			<FakeLink
				to={routes.login}
				loading={loading}
				customStyle={{ margin: '30px 0 0' }}
			>
				Já tem uma conta? Entre agora!
			</FakeLink>
		</PageContainer>
	);
}

const samePassword = (password, passwordCheck) => password === passwordCheck;
