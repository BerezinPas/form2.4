const NUMBERS = '1234567890';

export function passNumberValidator(value) {
	return value.split('').some((symbol) => NUMBERS.includes(symbol))
		? null
		: `Пароль должен содержать не менее одной цифры ${NUMBERS}`;
}
