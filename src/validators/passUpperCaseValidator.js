export function passUpperCaseValidator(value) {
	return value.toLowerCase() === value
		? 'Пароль должен содержать не менее одной заглавной буквы'
		: null;
}
