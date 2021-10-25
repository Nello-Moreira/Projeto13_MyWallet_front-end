import {
	WhiteBoard,
	NoContentWarning,
	LeftColumn,
	DateColumn,
	DescriptionColumn,
	TransactionValueColumn,
} from './TransactionsBoardStyles';

import { useState, useEffect } from 'react';

import { getTransactions } from '../../services/api';

import CircleLoader from '../loaders/CircleLoader';

export default function TransactionsBoard({ user }) {
	const [dates, setDates] = useState([]);
	const [descriptions, setDescriptions] = useState([]);
	const [transactionValues, setTransactionValues] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getTransactions(user.token)
			.then(response => {
				const serverDates = [];
				const serverDescription = [];
				const serverValues = [];

				response.data.forEach(transaction => {
					serverDates.push(transaction.date);
					serverDescription.push(transaction.description);
					serverValues.push(Number(transaction.value));
				});

				setDates(serverDates);
				setDescriptions(serverDescription);
				setTransactionValues(serverValues);
				setLoading(false);
			})
			.catch(error => {
				alert(
					'Não foi possível achar os dados das transações. Por favor, recarregue a página.'
				);
				setLoading(false);
			});
	}, []);

	return (
		<WhiteBoard>
			{loading ? (
				<CircleLoader customStyle={{ color: '#8c11be' }} />
			) : dates.length === 0 ? (
				<NoContentWarning>
					Não há registros de entrada ou saída
				</NoContentWarning>
			) : (
				<>
					<LeftColumn>
						<DateColumn>
							{dates.map((date, i) => (
								<p key={i}>{formatDate(date)}</p>
							))}
						</DateColumn>

						<DescriptionColumn>
							{descriptions.map((description, i) => (
								<p key={i}>{description}</p>
							))}
						</DescriptionColumn>
					</LeftColumn>

					<TransactionValueColumn>
						{transactionValues.map((value, i) => {
							if (value < 0) {
								value *= -1;

								return (
									<p style={{ color: '#C70000' }} key={i}>
										{value.toFixed(2)}
									</p>
								);
							}
							return (
								<p style={{ color: '#03AC00' }} key={i}>
									{value.toFixed(2)}
								</p>
							);
						})}
					</TransactionValueColumn>
				</>
			)}
		</WhiteBoard>
	);
}

const formatDate = date => {
	const options = { month: 'numeric', day: 'numeric' };
	date = new Date(date);
	return date.toLocaleDateString('pt-BR', options);
};
