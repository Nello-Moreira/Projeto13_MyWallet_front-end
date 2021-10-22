import FakeLink from '../components/FakeLink';
import routes from '../routes/routes';

export default function TransactionsPage() {
	return (
		<>
			<FakeLink to={routes.income}>entradas</FakeLink>
			<FakeLink to={routes.expenses}>saidas</FakeLink>
		</>
	);
}
