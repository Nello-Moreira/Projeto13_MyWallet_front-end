import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes/routes';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path={routes.signUp}></Route>

				<Route exact path={routes.transactions}></Route>

				<Route exact path={routes.income}></Route>

				<Route exact path={routes.expenses}></Route>

				<Route path={routes.login}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
