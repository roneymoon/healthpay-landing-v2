import { type FC } from 'react'
import styles from './styles.module.css'
import Convert from '@/assets/convert.svg'
import Placeholder from '@/assets/placeholder-1.svg'

const RealtimeApproval: FC = () => {
	return (
		<div className={styles.realtime__approval}>
			<div className={styles.icon__container}>
				<Convert />
			</div>
			<div className={styles.heading}>Instant Approval Processing</div>

			<div className={styles.description}>
				Automated decision-making system that triggers real-time approvals based on predefined rules and validation results.
			</div>
			<div className='mb-6'></div>
			<Placeholder />
		</div>
	)
}

export default RealtimeApproval 