import './App.css';
import routes from './routes/routes';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import IncomePage from './routes/IncomePage';
import ExpensesPage from './routes/ExpensesPage';
import TransactionsPage from './routes/TransactionsPage';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useState } from 'react';

function App() {
	const [user, setUser] = useState({ Name: '', userId: '', token: '' });
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={routes.signUp}>
					<SignUp />
				</Route>

				<Route exact path={routes.transactions}>
					<TransactionsPage user={user} />
				</Route>

				<Route exact path={routes.income}>
					<IncomePage user={user} />
				</Route>

				<Route exact path={routes.expenses}>
					<ExpensesPage user={user} />
				</Route>

				<Route path={routes.login}>
					<Login setUser={setUser} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
