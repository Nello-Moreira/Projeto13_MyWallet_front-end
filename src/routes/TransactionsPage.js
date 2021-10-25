import {
	PageContainer,
	PageTitleContainer,
	ButtonsContainer,
} from '../components/Containers';
import PageTitle from '../components/PageTitle';
import TransactionsBoard from '../components/TransactionsBoard/TransactionsBoard';
import AddIncomeButton from '../components/buttons/AddIncomeButton';
import AddExpenseButton from '../components/buttons/AddExpenseButton';
import LogoutButton from '../components/buttons/LogoutButton';

export default function TransactionsPage({ user }) {
	return (
		<PageContainer verticalAlignment={'space-between'}>
			<PageTitleContainer>
				<PageTitle>{`Olá, ${user.name}`}</PageTitle>

				<LogoutButton user={user} />
			</PageTitleContainer>

			<TransactionsBoard user={user} />

			<ButtonsContainer>
				<AddIncomeButton />
				<AddExpenseButton />
			</ButtonsContainer>
		</PageContainer>
	);
}
