import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function FakeLink({ to, loading, customStyle = {}, children }) {
	const history = useHistory();

	return (
		<LinkStyle
			onClick={loading ? null : () => history.push(to)}
			loading={loading}
			customStyle={customStyle}
		>
			{children}
		</LinkStyle>
	);
}

const LinkStyle = styled.a`
	font-weight: 700;
	font-size: 15px;
	text-decoration: none;
	color: rgb(210, 210, 210);
	margin: ${({ customStyle }) => customStyle.margin || '0'};
	cursor: ${({ loading }) => (loading ? 'default' : 'pointer')};

	:hover {
		filter: ${({ loading }) =>
			loading ? 'brightness(1)' : 'brightness(1.5)'};
	}

	:visited {
		color: rgb(210, 210, 210);
	}
`;
