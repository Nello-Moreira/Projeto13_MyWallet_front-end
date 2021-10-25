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

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from './routes';

import CircleLoader from '../components/loaders/CircleLoader';

export default function TransactionsPage({ user }) {
	const history = useHistory();
	const [pageFirstLoad, setPageFirstLoad] = useState(true);

	useEffect(() => {
		if (!user.token) {
			history.push(routes.login);
		}

		setPageFirstLoad(false);
	}, [user]);

	return pageFirstLoad ? (
		<CircleLoader />
	) : (
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
