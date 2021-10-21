import axios from 'axios';

const fiveSeconds = 5;

const axiosBase = axios.create({
	baseURL: 'http://localhost:4000',
	timeout: fiveSeconds * 1000,
});

const postLogin = data => axiosBase.post('/login', data);

const postSignUp = data => axiosBase.post('/sign-up', data);

export { postLogin, postSignUp };
