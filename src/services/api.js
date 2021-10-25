import axios from 'axios';

const fiveSeconds = 5;

const axiosBase = axios.create({
	baseURL: 'http://localhost:4000',
	timeout: fiveSeconds * 1000,
});

const authorizationHeader = token => ({
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

const postLogin = data => axiosBase.post('/login', data);

const postSignUp = data => axiosBase.post('/sign-up', data);

const postTransaction = (data, token) =>
	axiosBase.post('/transactions', data, authorizationHeader(token));

const getTransactions = token =>
	axiosBase.get('/transactions', authorizationHeader(token));

const logoutFromServer = ({ userId, token }) =>
	axiosBase.post('/logout', { userId }, authorizationHeader(token));

export {
	postLogin,
	postSignUp,
	postTransaction,
	getTransactions,
	logoutFromServer,
};
