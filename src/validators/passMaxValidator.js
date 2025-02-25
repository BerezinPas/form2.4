export function passMaxValidator(value) {
	return value.length > 16
		? 'Пароль должен быть не более 16-ти символов'
		: null;
}
