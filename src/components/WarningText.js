import styled from 'styled-components';

export default function WarningText({ color, children }) {
	return <WarningTextStyle color={color}>{children}</WarningTextStyle>;
}

const WarningTextStyle = styled.p`
	font-size: 18px;
	color: ${({ color }) => color || 'rgb(255,255,255)'};
`;
