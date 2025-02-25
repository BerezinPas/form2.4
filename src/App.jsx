import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';
import { InputGroup } from './components';
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
	const [formValids, setFormValids] = useState({
		email: false,
		password: false,
		passwordRepeat: false,
	});
	console.log(formValids);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
	});

	let isFormValid = Object.values(formValids).every((value) => value);
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
				validators={[emailValidator]}
				setValid={(bool) => setFormValids({ ...formValids, email: bool })}
				forceValidate={formValids.password && formValids.passwordRepeat}
			/>
			<InputGroup
				lavelText="Пароль"
				onChange={onInputChange}
				name="password"
				type="password"
				value={formData.password}
				placeholder="password"
				setValue={onInputChange}
				validators={[
					passLowerCaseValidator,
					passMinValidator,
					passSpecialSymbolValidator,
					passNumberValidator,
					passUpperCaseValidator,
				]}
				onChangeValidators={[passMaxValidator]}
				setValid={(bool) => setFormValids({ ...formValids, password: bool })}
				forceValidate={formValids.email && formData.passwordRepeat}
			/>
			<InputGroup
				lavelText="Повтор пароля"
				type="password"
				onChange={onInputChange}
				name="passwordRepeat"
				value={formData.passwordRepeat}
				placeholder="password"
				setValue={onInputChange}
				validators={[passRepeatValidator]}
				onChangeValidators={[passRepeatValidator]}
				setValid={(bool) =>
					setFormValids({ ...formValids, passwordRepeat: bool })
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
