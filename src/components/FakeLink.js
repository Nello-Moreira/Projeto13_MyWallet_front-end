import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import routes from '../routes/routes';

export default function FakeLink({ to, loading, children }) {
	const history = useHistory();

	return (
		<LinkStyle onClick={() => history.push(to)} loading={loading}>
			{children}
		</LinkStyle>
	);
}

const LinkStyle = styled.a`
	font-weight: 700;
	font-size: 15px;
	text-decoration: none;
	color: rgb(210, 210, 210);
	margin-top: 30px;
	cursor: ${({ loading }) => (loading ? 'default' : 'pointer')};

	:hover {
		filter: brightness(1.5);
	}

	:visited {
		color: rgb(210, 210, 210);
	}
`;