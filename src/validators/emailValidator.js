export const emailValidator = (val) => {
	let error = null;
	if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(val)) {
		error = 'Некорректный email';
	}
	return error;
};
