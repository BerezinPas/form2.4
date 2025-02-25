import * as yup from 'yup';

export const passwordRepeatScheme = (password) =>
	yup.string().test('passwordRepeatScheme', 'Пароли не совпадают', (val) => {
		console.log(val);

		return val === password;
	});
