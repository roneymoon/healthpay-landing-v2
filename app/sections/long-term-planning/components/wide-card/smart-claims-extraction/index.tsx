import { type FC } from 'react'
import Convert from '@/assets/convert.svg'
import Placeholder from '@/assets/placeholder-1.svg'
import styles from './styles.module.css'

const SmartClaimsExtraction: FC = () => {
	return (
		<div className={styles.smart__claims}>
			<div className={styles.icons__container}>
				<Convert />
			</div>
			<span className={styles.heading}>Intelligent Claims Data Extraction</span>

			<span className={styles.paragraph}>
				Our AI-powered system automatically extracts and processes critical information from claims documents, reducing manual entry and improving accuracy.
			</span>
			<Placeholder />
		</div>
	)
}

export default SmartClaimsExtraction 