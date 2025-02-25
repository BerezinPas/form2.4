import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './App.module.scss';
import { InputGroup } from './components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	emailScheme,
	passwordMaxScheme,
	passwordRepeatScheme,
	passwordScheme,
} from './schemes';

function App() {
	const formScheme = yup.object().shape({
		email: emailScheme,
		password: passwordMaxScheme.concat(passwordScheme),
		passwordRepeat: passwordRepeatScheme,
	});

	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors, isValid, touchedFields },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		mode: 'onTouched',
		resolver: yupResolver(formScheme),
	});

	let submitBtnRef = useRef(null);

	useEffect(() => {
		if (isValid) {
			submitBtnRef.current.focus();
		}
	}, [isValid]);

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<InputGroup
				lavelText="Почта"
				name="email"
				placeholder="example@mail.ru"
				{...register('email')}
				error={errors.email?.message}
			/>
			<InputGroup
				lavelText="Пароль"
				name="password"
				type="password"
				placeholder="password"
				{...register('password', {
					onChange: () => touchedFields.password && trigger('passwordRepeat'),
				})}
				error={errors.password?.message}
			/>
			<InputGroup
				lavelText="Повтор пароля"
				placeholder="password"
				name="passwordRepeat"
				type="password"
				{...register('passwordRepeat')}
				error={errors.passwordRepeat?.message}
			/>

			<button
				ref={submitBtnRef}
				className={styles.submitBtn}
				type="submit"
				disabled={!isValid}
			>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default App;
