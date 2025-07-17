import { FC } from 'react'
import SidebarControls from '@/assets/sidebar-controls.svg'
import SidebarEdit from '@/assets/sidebar-edit.svg'
import OtherTeams from '@/assets/other-teams.svg'
import styles from './styles.module.css'
import IllustrateAnimate from '@/components/illustrate-animate'

import { ArrowDownNarrowWideIcon, BadgeCheckIcon, BookCheck, BrainCircuit, Briefcase, ChartNoAxesCombined, DnaOff, ListChecks, ShieldOff, SquareActivity } from 'lucide-react'

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.top__container}>
				<IllustrateAnimate
					delay={2.9}
					// duration={3.5}
					className={styles.dot__container}>
					<div />
					<div />
					<div />
				</IllustrateAnimate>
				<IllustrateAnimate
					delay={2.7}
					// duration={3.55}
					className={styles.illustrate__animate}>
					<SidebarControls />
				</IllustrateAnimate>
			</div>

			<div className={styles.sidebar__header__container}>
				<IllustrateAnimate
					delay={2.5}
					// duration={3}
					className={styles.illustrate__animate}>
					<p className="text-gray-200 text-[20px] font-medium">HealthPay</p>
				</IllustrateAnimate>
				<IllustrateAnimate
					// duration={3.6}
					delay={2.3}
					className={styles.illustrate__animate}>
					<SidebarEdit />
				</IllustrateAnimate>
			</div>

			<div className={styles.sidebar__dropdown__outter__container}>
				<IllustrateAnimate
					delay={2.1}
					// duration={3}
					className={styles.illustrate__animate}>
					<p className="text-gray-200/50 text-[14px] font-medium">Insurance Claims</p>
				</IllustrateAnimate>
				<IllustrateAnimate
					delay={1.9}
					// duration={2.8}
					className={styles.illustrate__animate}>
					<div className="flex flex-col gap-2">
						<h1 className="text-gray-200/50 text-[12px] font-medium flex flex-row gap-2 mb-2">Workspace <span>{<ArrowDownNarrowWideIcon size={16} />}</span></h1>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<BadgeCheckIcon className='text-green-400' size={14} />}</span>Pre-authorisation</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<DnaOff className='text-violet-400' size={14} />}</span>Non-medico</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<Briefcase className='text-purple-400' size={14} />}</span>Medico</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<SquareActivity className='text-blue-400' size={14} />}</span>Audit</div>
					</div>
				</IllustrateAnimate>
				<IllustrateAnimate
					delay={1.7}
					// duration={2.6}
					className={styles.illustrate__animate}>
					<div className="flex flex-col gap-2">
						<h1 className="text-gray-200/50 text-[12px] font-medium flex flex-row gap-2 mb-2">Analytics<span>{<ArrowDownNarrowWideIcon size={16} />}</span></h1>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<BadgeCheckIcon className='text-green-400' size={14} />}</span>Auth Requests</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<DnaOff className='text-violet-400' size={14} />}</span>Auth Success</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<Briefcase className='text-purple-400' size={14} />}</span>Claims</div>
						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2"><span>{<SquareActivity className='text-blue-400' size={14} />}</span>Pending Approval</div>
					</div>
				</IllustrateAnimate>
				<IllustrateAnimate
					delay={1.5}
					// duration={2.4}
					className={styles.illustrate__animate}>
					<div className="flex flex-col gap-2">
						<h1 className="text-gray-200/50 text-[12px] font-medium mb-2 ">Additional Features</h1>

						<div className="text-gray-200 text-[14px] font-medium flex flex-row gap-2">
							<BrainCircuit className="text-blue-400" size={14} />
							AI Claims Engine
						</div>

						<div className="text-gray-200/50 text-[11px] font-medium flex flex-row gap-2">
							<ShieldOff className="text-green-400 " size={14} />
							Claim Eligibility
						</div>

						<div className="text-gray-200/50 text-[11px] font-medium flex flex-row gap-2">
							<BookCheck className="text-violet-400 ml-5" size={14} />
							Claim Validation
						</div>

						<div className="text-gray-200/50 text-[11px] font-medium flex flex-row gap-2">
							<ChartNoAxesCombined className="text-purple-400 ml-5" size={14} />
							Reports
						</div>

						<div className="text-gray-200/50 text-[11px] font-medium flex flex-row gap-2">
							<ListChecks className="text-blue-400 ml-5" size={14} />
							Compliance
						</div>
					</div>

				</IllustrateAnimate>
				<IllustrateAnimate
					delay={1.3}
					// duration={2.2}
					className={styles.illustrate__animate}>
					<OtherTeams />
				</IllustrateAnimate>
			</div>
		</div>
	)
}

export default Sidebar
