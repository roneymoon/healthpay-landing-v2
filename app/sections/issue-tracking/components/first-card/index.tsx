import { type FC } from 'react'
import Graph from '@/assets/graph.svg'
import styles from './styles.module.css'

const FirstCard: FC = () => {
	return (
		<div className={styles.first__card}>
			<div className={styles.outter__container}>
				<div className={styles.inner__container}>
					<div className={styles.text__container}>
						<span className={styles.text__title}>Batch #238</span>
						<div className={styles.label__container}>
							<GraphLabel title='Claims Received' backgroundColor='#91959C' />
							<GraphLabel title='Claims Processed' backgroundColor='#DEB949' />
							<GraphLabel title='Claims Settled' backgroundColor='#6771C5' />
						</div>

						<div className={styles.graph__container}>
							<Graph />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

type Props = {
	title: string
	backgroundColor: string
}

const GraphLabel: FC<Props> = ({ title, backgroundColor }) => {
	return (
		<div className={styles.label}>
			<div className={styles.label__marker} style={{ backgroundColor }} />
			<span className={styles.label__title}> {title} </span>
		</div>
	)
}

export default FirstCard
