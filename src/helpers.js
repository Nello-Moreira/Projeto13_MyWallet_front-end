const resetInputsValues = inputs =>
	inputs.map(inp => {
		inp.value = '';
		return inp;
	});

export { resetInputsValues };
