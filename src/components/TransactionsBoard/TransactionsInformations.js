import {
	TransactionsContainer,
	TransactionLine,
	LeftColumn,
	DateColumn,
	DescriptionColumn,
	TransactionValueColumn,
} from './TransactionsBoardStyles';

export default function TransactionsInformations({ transactions }) {
	const formatValue = value => {
		if (value < 0) {
			value *= -1;

			return (
				<p style={{ color: '#C70000' }}>
					{value.toFixed(2).replace('.', ',')}
				</p>
			);
		}
		return (
			<p style={{ color: '#03AC00' }}>
				{value.toFixed(2).replace('.', ',')}
			</p>
		);
	};
	return (
		<TransactionsContainer>
			{transactions.map((transaction, i) => (
				<TransactionLine key={i}>
					<LeftColumn>
						<DateColumn>
							<p>{formatDate(transaction.date)}</p>
						</DateColumn>

						<DescriptionColumn>
							<p>{transaction.description}</p>
						</DescriptionColumn>
					</LeftColumn>

					<TransactionValueColumn>
						{formatValue(Number(transaction.value))}
					</TransactionValueColumn>
				</TransactionLine>
			))}
		</TransactionsContainer>
	);
}

const formatDate = date => {
	const options = { month: 'numeric', day: 'numeric' };
	date = new Date(date);
	return date.toLocaleDateString('pt-BR', options);
};
