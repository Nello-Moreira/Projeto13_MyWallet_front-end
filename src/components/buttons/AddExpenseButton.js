import { AiOutlineMinusCircle } from 'react-icons/ai';

import LinkButtonStyle from './LinkButtonStyle';

import { useHistory } from 'react-router-dom';
import routes from '../../routes/routes';

export default function AddIncomeButton() {
	const history = useHistory();

	return (
		<LinkButtonStyle onClick={() => history.push(routes.expenses)}>
			<AiOutlineMinusCircle fontSize='25px' />
			<p>
				Nova <br />
				saída
			</p>
		</LinkButtonStyle>
	);
}
