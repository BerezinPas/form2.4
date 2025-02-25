import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { InputGroup } from './components';
import {
	emailScheme,
	passwordMaxScheme,
	passwordRepeatScheme,
	passwordScheme,
} from './schemes';
import {
	emailValidator,
	passLowerCaseValidator,
	passMaxValidator,
	passMinValidator,
	passNumberValidator,
	passSpecialSymbolValidator,
	passUpperCaseValidator,
} from './validators';

function App() {
	const [formValid, setFormValid] = useState({
		email: false,
		password: false,
		passwordRepeat: false,
	});
	// console.log(formValid);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
	});

	let isFormValid = Object.values(formValid).every((value) => value);
	let submitBtnRef = useRef(null);

	const onInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const passRepeatValidator = (val) =>
		val === formData.password ? null : 'Пароли не совпадают';

	useEffect(() => {
		if (isFormValid) {
			submitBtnRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<form
			action=""
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault();
				console.log(formData.email, formData.password);
			}}
		>
			<InputGroup
				lavelText="Почта"
				onChange={onInputChange}
				name="email"
				value={formData.email}
				placeholder="example@mail.ru"
				setValue={onInputChange}
				// validators={[emailValidator]}
				schemes={[emailScheme]}
				setValid={(bool) => setFormValid({ ...formValid, email: bool })}
				forceValidate={formValid.password && formValid.passwordRepeat}
			/>
			<InputGroup
				lavelText="Пароль"
				onChange={onInputChange}
				name="password"
				type="password"
				value={formData.password}
				placeholder="password"
				setValue={onInputChange}
				schemes={[passwordScheme]}
				onChangeSchemes={[passwordMaxScheme]}
				// validators={[
				// 	passLowerCaseValidator,
				// 	passMinValidator,
				// 	passSpecialSymbolValidator,
				// 	passNumberValidator,
				// 	passUpperCaseValidator,
				// ]}
				// onChangeValidators={[passMaxValidator]}
				setValid={(bool) => setFormValid({ ...formValid, password: bool })}
				forceValidate={formValid.email && formData.passwordRepeat}
			/>
			<InputGroup
				lavelText="Повтор пароля"
				type="password"
				onChange={onInputChange}
				name="passwordRepeat"
				value={formData.passwordRepeat}
				placeholder="password"
				setValue={onInputChange}
				schemes={[passwordRepeatScheme(formData.password)]}
				onChangeSchemes={[passwordRepeatScheme(formData.password)]}
				validators={[passRepeatValidator]}
				onChangeValidators={[passRepeatValidator]}
				setValid={(bool) =>
					setFormValid({ ...formValid, passwordRepeat: bool })
				}
				forceValidate={formData.password}
				dependencies={[formData.password]}
			/>

			<button
				ref={submitBtnRef}
				className={styles.submitBtn}
				type="submit"
				disabled={!isFormValid}
			>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default App;
