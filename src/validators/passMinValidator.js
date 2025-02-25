export function passMinValidator(value) {
	return value.length < 8 ? 'Пароль должен быть не менее 8-ми символов' : null;
}
