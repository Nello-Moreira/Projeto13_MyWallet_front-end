import { PageContainer, PageTitleContainer } from '../components/Containers';
import PageTitle from '../components/PageTitle';
import CustomForm from '../components/inputs/CustomForm';
import WarningText from '../components/WarningText';
import FakeLink from '../components/FakeLink';
import CircleLoader from '../components/loaders/CircleLoader';

import routes from './routes';

import { postTransaction } from '../services/api';
import statusCode from '../services/statusCode';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { resetInputsValues } from '../helpers';

export default function IncomePage({ user }) {
	const history = useHistory();
	const [pageFirstLoad, setPageFirstLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [warning, setWarning] = useState(false);
	const [inputs, setInputs] = useState([
		{
			field: 'value',
			type: 'number',
			value: '',
			placeholder: 'Valor',
		},
		{
			field: 'description',
			type: 'text',
			value: '',
			placeholder: 'Descrição',
		},
	]);

	useEffect(() => {
		if (!user.token) {
			history.push(routes.login);
		}

		setPageFirstLoad(false);
	}, [user]);

	function formSubmit(event) {
		event.preventDefault();
		setLoading(true);

		const multiplier = 1;

		const data = {
			userId: user.userId,
			value: inputs.find(input => input.field === 'value').value,
			description: inputs.find(input => input.field === 'description')
				.value,
		};

		if (data.value === '' || data.description === '') {
			return alert('Preencha corretamente todos os campos');
		}

		data.value = data.value * multiplier;

		postTransaction(data, user.token)
			.then(response => {
				setWarning('Entrada cadastrada com sucesso.');

				setInputs(resetInputsValues(inputs));

				setLoading(false);
			})
			.catch(error => {
				let text;

				switch (error.response.status) {
					case statusCode.badRequest:
						text = `Um campo foi preenchido incorretamente`;
						break;

					case statusCode.unauthorized:
						text = 'Sua sessão expirou. É necessário novo login.';
						break;

					default:
						text =
							'Houve um erro ao enviar as informações. Por favor, tente novamente.';
						break;
				}
				alert(text);
				setLoading(false);
			});
	}

	return (
		<PageContainer verticalAlignment={'flex-start'}>
			{pageFirstLoad ? (
				<CircleLoader />
			) : (
				<>
					<PageTitleContainer>
						<PageTitle>Nova entrada</PageTitle>

						<FakeLink to={routes.transactions} loading={loading}>
							Voltar
						</FakeLink>
					</PageTitleContainer>

					<CustomForm
						formInfos={inputs}
						formSubmit={formSubmit}
						loading={loading}
						buttonText='Salvar entrada'
						saveInputsState={newInputsState => {
							setInputs(newInputsState);
							setWarning(false);
						}}
					/>

					{warning ? <WarningText>{warning}</WarningText> : null}
				</>
			)}
		</PageContainer>
	);
}
