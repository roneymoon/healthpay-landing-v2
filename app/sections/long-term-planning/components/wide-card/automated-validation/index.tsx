import { type FC } from 'react'
import styles from './styles.module.css'
import Support from '@/assets/support.svg'
import Placeholder from '@/assets/placeholder-2.svg'

const AutomatedValidation: FC = () => {
	return (
		<div className={styles.automated__validation}>
			<div className={styles.icon__container}>
				<Support />
			</div>

			<span className={styles.heading}>Smart Validation Engine</span>

			<span className={styles.paragraph}>
				Advanced algorithms automatically validate claims against policy rules, coverage limits, and compliance requirements to ensure accuracy and reduce errors.
			</span>
			<Placeholder />
		</div>
	)
}

export default AutomatedValidation 