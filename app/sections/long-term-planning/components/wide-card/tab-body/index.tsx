import { type FC } from 'react'
import EditorContent from '@/assets/editor-content.svg'
import styles from './styles.module.css'
import SmartClaimsExtraction from '../smart-claims-extraction'
import AutomatedValidation from '../automated-validation'
import RealtimeApproval from '../realtime-approval'

type Props = {
	currentTab: string
}

const TabBody: FC<Props> = ({ currentTab }) => {
	return (
		<div className={styles.tab__body}>
			<div className={styles.tab__body__container}>
				<EditorContent />
				<div className={styles.tab__body__inner__container}>
					{currentTab === 'tab-header-1' && <SmartClaimsExtraction />}
					{currentTab === 'tab-header-2' && <AutomatedValidation />}
					{currentTab === 'tab-header-3' && <RealtimeApproval />}
				</div>
			</div>
		</div>
	)
}

export default TabBody
