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
	const [transactions, setTransactions] = useState([]);
	const [totalBalance, setTotalBalance] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getTransactions(user.token)
			.then(response => {
				setTransactions(response.data);

				if (response.data.length > 0) {
					const values = response.data.map(obj => Number(obj.value));
					const newBalance = values.reduce((previous, current) => {
						return previous + current;
					});
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
			) : transactions.length === 0 ? (
				<NoContentWarning>
					Não há registros de entrada ou saída
				</NoContentWarning>
			) : (
				<>
					<TransactionInformations transactions={transactions} />
					<Balance>
						<span>SALDO</span>
						{totalBalance < 0 ? (
							<span style={{ color: '#C70000' }}>
								{totalBalance * -1}
							</span>
						) : (
							<span style={{ color: '#03AC00' }}>
								{totalBalance}
							</span>
						)}
					</Balance>
				</>
			)}
		</WhiteBoard>
	);
}
