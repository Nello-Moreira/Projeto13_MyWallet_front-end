import { RiLogoutBoxRLine } from 'react-icons/ri';

import { useHistory } from 'react-router-dom';
import routes from '../../routes/routes';

import { logoutFromServer } from '../../services/api';

import styled from 'styled-components';

export default function LogoutButton({ user }) {
	const history = useHistory();

	function logout() {
		logoutFromServer(user)
			.then(response => {
				localStorage.removeItem('MyWalletUser');
				history.push(routes.login);
			})
			.catch(error =>
				alert(
					'Houve um erro ao realizar o logout. Por favor, tente novamente'
				)
			);
	}

	return (
		<ButtonStyle onClick={logout}>
			<RiLogoutBoxRLine />
		</ButtonStyle>
	);
}

const ButtonStyle = styled.button`
	font-size: 23px;
	color: rgb(255, 255, 255);
	padding: 0px;
	background-color: inherit;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
