import * as yup from 'yup';

export const emailScheme = yup.string().email('Некорректный email');
