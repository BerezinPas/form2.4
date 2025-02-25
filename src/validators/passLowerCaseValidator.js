export function passLowerCaseValidator(value) {
	return value.toUpperCase() === value
		? 'Пароль должен содержать не менее одной строчной буквы'
		: null;
}
