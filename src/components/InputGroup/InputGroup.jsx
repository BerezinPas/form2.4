import { useEffect, useState } from 'react';
import styles from './InputGroup.module.scss';

const validate = (arr, val) => {
	let error = null;
	arr.some((validator) => {
		error = validator(val);
		return error;
	});
	return error;
};

export function InputGroup({
	lavelText,
	setValue,
	value,
	setValid,
	forceValidate,
	validators = [],
	onChangeValidators = [],
	dependencies = [],

	...props
}) {
	const [inputError, setInputError] = useState(null);
	const [isDirty, setIsDirty] = useState(false);
	const [isWasErrored, setIsWasErrored] = useState(false);

	const validateField = (val, shouldValidate) => {
		let error = null;
		let isValid = false;
		const allValidators = [...validators, ...onChangeValidators];

		if (shouldValidate) {
			error = validate(allValidators, val);
			isValid = error === null;
			// console.log('isDirty', isDirty);
		} else {
			error = validate(onChangeValidators, val);
		}

		setValid(isValid);
		setInputError(error);
	};

	useEffect(() => {
		if (inputError) {
			setIsWasErrored(true);
		}
	}, [inputError]);

	useEffect(() => {
		if (isDirty) {
			validateField(value, isDirty);
		}
	}, [...dependencies]);

	const onChange = (e) => {
		setIsDirty(true);
		setValue(e);
		validateField(e.target.value, isWasErrored || forceValidate);
	};

	const onBlur = () => {
		if (isDirty) {
			validateField(value, isDirty);
			// console.log('OBLUR isDirty', isDirty, 'value', value);
		}
	};

	return (
		<div className={styles.inputGroup}>
			<label className={styles.label}>
				<p className={styles.labelText}>{lavelText}</p>
				<input
					{...props}
					className={styles.input}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
				/>
			</label>
			{inputError && <div className={styles.error}>{inputError}</div>}
		</div>
	);
}
