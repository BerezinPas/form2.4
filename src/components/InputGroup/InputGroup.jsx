import styles from './InputGroup.module.scss';

export function InputGroup({ lavelText, error, ...props }) {
	return (
		<div className={styles.inputGroup}>
			<label className={styles.label}>
				<p className={styles.labelText}>{lavelText}</p>
				<input {...props} className={styles.input} />
			</label>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
}
