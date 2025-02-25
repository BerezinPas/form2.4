import * as yup from 'yup';

export const passwordMaxScheme = yup
	.string()
	.max(16, 'Пароль должен быть не более 16-ти символов');
