import { type FC } from 'react'
import LayoutWrapper from '@/components/layout-wrapper'
import SectionHeading from './components/section-heading'
import { ExpandableCard } from '@/components/ExpandableCard'
import styles from './styles.module.css'

const ModernProductTeams: FC = () => {
	return (
		<section className={styles.modern__product__teams}>
			<LayoutWrapper>
				<div className="flex flex-col items-start gap-8 md:gap-12 lg:gap-16">
					<SectionHeading />
					<div className="w-full">
						<ExpandableCard />
					</div>
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default ModernProductTeams
