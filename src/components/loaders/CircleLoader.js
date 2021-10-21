import styled from 'styled-components';
import Loader from 'react-loader-spinner';

export default function CircleLoader({ customStyle = {} }) {
	return (
		<Container customStyle={customStyle}>
			<Loader
				type='Oval'
				color={customStyle.color || 'rgba(255,255,255)'}
				height={80}
				width={80}
			/>
		</Container>
	);
}

const Container = styled.div`
	height: ${({ customStyle }) => customStyle.height || 'auto'};
	width: ${({ customStyle }) => customStyle.width || '100%'};
	margin: ${({ customStyle }) => customStyle.margin || '0'};
	display: flex;
	justify-content: center;
	align-items: center;
`;
