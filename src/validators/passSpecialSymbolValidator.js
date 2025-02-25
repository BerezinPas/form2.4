const SPECIAL_SUMBOLS = '!@#$%^&*()_+';

export function passSpecialSymbolValidator(value) {
	return value.split('').some((symbol) => SPECIAL_SUMBOLS.includes(symbol))
		? null
		: `Пароль должен содержать не менее одного из спец символов ${SPECIAL_SUMBOLS}`;
}
