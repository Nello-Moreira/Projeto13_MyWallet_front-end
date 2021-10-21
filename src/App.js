import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes/routes';
import Login from './routes/login';
import SignUp from './routes/signUp';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={routes.signUp}>
					<SignUp />
				</Route>

				<Route exact path={routes.transactions}></Route>

				<Route exact path={routes.income}></Route>

				<Route exact path={routes.expenses}></Route>

				<Route path={routes.login}>
					<Login />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
