import styled from 'styled-components';

const PageContainer = styled.div`
	box-sizing: border-box;
	width: 100%;
	height: 100vh;
	padding: 25px 20px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${({ verticalAlignment }) =>
		verticalAlignment || 'center'};
`;

const PageTitleContainer = styled.div`
	box-sizing: border-box;
	width: 100%;
	max-width: 750px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ButtonsContainer = styled.div`
	width: 100%;
	max-width: 750px;
	margin-top: 15px;
	display: flex;
	align-items: center;
	justify-content: ${({ horizontalAlignment }) =>
		horizontalAlignment || 'space-between'};
`;

export { PageContainer, PageTitleContainer, ButtonsContainer };
