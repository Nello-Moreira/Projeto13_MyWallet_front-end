import {
	TransactionsContainer,
	LeftColumn,
	DateColumn,
	DescriptionColumn,
	TransactionValueColumn,
} from './TransactionsBoardStyles';

export default function TransactionsInformations({
	dates,
	descriptions,
	transactionValues,
}) {
	return (
		<TransactionsContainer>
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
								{value.toFixed(2).replace('.', ',')}
							</p>
						);
					}
					return (
						<p style={{ color: '#03AC00' }} key={i}>
							{value.toFixed(2).replace('.', ',')}
						</p>
					);
				})}
			</TransactionValueColumn>
		</TransactionsContainer>
	);
}

const formatDate = date => {
	const options = { month: 'numeric', day: 'numeric' };
	date = new Date(date);
	return date.toLocaleDateString('pt-BR', options);
};
