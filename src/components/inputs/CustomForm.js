import FormStyle from './FormStyle';
import InputStyle from './InputStyle';
import StandardButton from '../buttons/StandardButton';

import { useState } from 'react';

export default function CustomForm({
	formInfos,
	saveInputsState,
	formSubmit,
	loading,
	buttonText = 'Enviar',
}) {
	const inputModifier = (event, field, changingInput) => {
		changingInput.value = event.target.value;

		const newInputsState = formInfos.map(input => {
			if (input.field === field) return changingInput;
			return input;
		});

		saveInputsState(newInputsState);
	};

	return (
		<FormStyle onSubmit={formSubmit}>
			{formInfos.map((formInput, i) => (
				<InputStyle
					value={formInput.value}
					onChange={
						loading
							? null
							: event =>
									inputModifier(
										event,
										formInput.field,
										formInput
									)
					}
					placeholder={formInput.placeholder}
					loading={loading}
					type={formInput.type}
					required
					key={i}
				/>
			))}

			<StandardButton type='submit' loading={loading}>
				{buttonText}
			</StandardButton>
		</FormStyle>
	);
}
