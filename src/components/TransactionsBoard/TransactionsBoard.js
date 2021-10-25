import {
	WhiteBoard,
	NoContentWarning,
	Balance,
} from './TransactionsBoardStyles';
import TransactionInformations from './TransactionsInformations';

import { useState, useEffect } from 'react';

import { getTransactions } from '../../services/api';

import CircleLoader from '../loaders/CircleLoader';

export default function TransactionsBoard({ user }) {
	const [dates, setDates] = useState([]);
	const [descriptions, setDescriptions] = useState([]);
	const [transactionValues, setTransactionValues] = useState([]);
	const [totalBalance, setTotalBalance] = useState(0);

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

				if (serverValues.length > 0) {
					const newBalance = serverValues.reduce(
						(previous, current) => previous + current
					);

					setTotalBalance(newBalance);
				}
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
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
					<TransactionInformations
						dates={dates}
						descriptions={descriptions}
						transactionValues={transactionValues}
					/>
					<Balance>
						<span>SALDO</span>
						{totalBalance < 0 ? (
							<span style={{ color: '#C70000' }}>
								{totalBalance.toFixed(2).replace('.', ',')}
							</span>
						) : (
							<span style={{ color: '#03AC00' }}>
								{totalBalance.toFixed(2).replace('.', ',')}
							</span>
						)}
					</Balance>
				</>
			)}
		</WhiteBoard>
	);
}
