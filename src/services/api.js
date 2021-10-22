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

export { postLogin, postSignUp, postTransaction };
