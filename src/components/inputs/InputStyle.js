import styled from 'styled-components';

const InputStyle = styled.input`
	box-sizing: border-box;
	font-size: 20px;
	color: ${({ loading }) => (loading ? 'rgb(175, 175, 175)' : 'rgb(0,0,0)')};
	width: 100%;
	padding: 10px;
	background-color: ${({ loading }) =>
		loading ? 'rgb(242, 242, 242)' : 'rgb(255,255,255)'};
	border: none;
	border-radius: 5px;
	outline: none;

	::placeholder {
		color: rgb(160, 160, 160);
	}
	:focus {
		color: ${({ loading }) => (loading ? 'transparent' : 'rgb(0,0,0)')};
		text-shadow: ${({ loading }) =>
			loading ? '0px 0px 0px rgb(175, 175, 175)' : 'none'};
	}
`;

export default InputStyle;
