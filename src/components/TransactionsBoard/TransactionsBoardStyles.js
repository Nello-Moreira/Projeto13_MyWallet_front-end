import styled from 'styled-components';

const WhiteBoard = styled.div`
	box-sizing: border-box;
	height: 70%;
	width: 100%;
	background-color: rgb(255, 255, 255);
	border-radius: 5px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const NoContentWarning = styled.div`
	font-size: 20px;
	color: rgba(134, 134, 134, 1);
	text-align: center;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TransactionsContainer = styled.div`
	height: 90%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow-y: auto;
`;

const TransactionLine = styled.div`
	display: flex;
	justify-content: space-between;
`;

const LeftColumn = styled.div`
	display: flex;
	justify-content: flex-start;
`;

const InfoColumn = styled.div`
	font-size: 17px;

	> * {
		margin-bottom: 25px;
	}
`;

const DateColumn = styled(InfoColumn)`
	text-align: left;
	color: rgba(198, 198, 198, 1);
`;

const DescriptionColumn = styled(InfoColumn)`
	text-align: left;
	color: rgba(0, 0, 0, 1);
	padding: 0 10px;
`;

const TransactionValueColumn = styled(InfoColumn)`
	text-align: right;
`;

const Balance = styled.div`
	font-size: 17px;
	width: 100%;
	display: flex;
	justify-content: space-between;

	span:first-child {
		font-weight: 700;
	}
`;

export {
	WhiteBoard,
	NoContentWarning,
	TransactionsContainer,
	TransactionLine,
	LeftColumn,
	DateColumn,
	DescriptionColumn,
	TransactionValueColumn,
	Balance,
};
