import * as yup from 'yup';

export const passwordRepeatScheme = yup
	.string()
	.oneOf([yup.ref('password'), null], 'Пароли не совпадают');
