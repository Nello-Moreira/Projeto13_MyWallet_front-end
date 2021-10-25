import styled from 'styled-components';

const WhiteBoard = styled.div`
	box-sizing: border-box;
	height: 100%;
	width: 100%;
	background-color: rgb(255, 255, 255);
	border-radius: 5px;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	overflow-y: auto;
`;

const NoContentWarning = styled.div`
	font-size: 20px;
	color: rgba(134, 134, 134, 1);
	text-align: center;
	width: 100%;
	padding: 20%;
	display: flex;
	align-items: center;
	justify-content: center;
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

export {
	WhiteBoard,
	NoContentWarning,
	LeftColumn,
	DateColumn,
	DescriptionColumn,
	TransactionValueColumn,
};
