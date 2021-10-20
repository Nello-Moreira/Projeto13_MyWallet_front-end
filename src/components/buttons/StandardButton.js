import styled from 'styled-components';

export default function StandardButton({ loading, children, ...otherProps }) {
	return (
		<ButtonStyle loading={loading} {...otherProps}>
			{children}
		</ButtonStyle>
	);
}

const ButtonStyle = styled.button`
	font-weight: 700;
	font-size: 20px;
	color: rgb(255, 255, 255);
	width: 100%;
	padding: 11px;
	background-color: #a328d6;
	border-radius: 5px;
	border: 1px solid #641385;
	cursor: ${({ loading }) => (loading ? 'default' : 'pointer')};
`;
