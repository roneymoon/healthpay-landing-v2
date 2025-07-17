import { type FC } from 'react'
import styles from './styles.module.css'
import Progress from '@/assets/progress.svg'
import Person from '@/assets/person.svg'
import Image from 'next/image'
import Figma from '@/assets/figma.svg'
import Funnal from '@/assets/funnal.svg'
import BlueDiamond from '@/assets/blue-diamond.svg'
import YellowDiamond from '@/assets/yellow-diamond.svg'


const FirstCard: FC = () => {
	return (
		<div className={styles.project__overview__card}>
			<div className={styles.outter__container}>
				<div className={styles.inner__container}>
					<h4 className={styles.heading}> Claims Overview </h4>

					<dl className={styles.definition__list}>
						<div className={styles.list__item__container}>
							<dt className={styles.list__label}> Properties </dt>
							<dd className={styles.list__data}>
								<div className={styles.first__data__row}>
									<div className={styles.item}>
										<Progress />
										<span className={styles.item__text}> Claim ID </span>
									</div>

									<div className={styles.item}>
										<Person />
										<span className={styles.item__text}> PATIENT </span>
									</div>

									<div className={styles.item}>
										<div className={styles.item__group}>

											<div className={styles.profile}>
												<Image
													src='/user-5.png'
													alt=''
													width={18}
													height={18}
												/>
											</div>

											<div className={styles.profile}>
												<Image
													src='/user-6.jpg'
													alt=''
													width={18}
													height={18}
												/>
											</div>

											<div className={styles.profile}>
												<Image
													src='/user-7.jpg'
													alt=''
													width={18}
													height={18}
												/>
											</div>
										</div>
									</div>
								</div>
							</dd>
						</div>

						<div className={styles.list__item__container}>
							<dt className={styles.list__label}> Policy Holder </dt>
							<dd>
								<div className={styles.first__data__row}>
									<div className={styles.data__button}>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#943cc3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-question-mark-icon lucide-badge-question-mark"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>

										<span className={styles.item__text}>  insurance ID </span>
									</div>

									<div className={styles.data__button}>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fe345" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hospital-icon lucide-hospital"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>

										<span className={styles.item__text}> Patient name </span>
									</div>
								</div>
							</dd>
						</div>

						<div className={styles.list__item__container}>
							<dt className={styles.list__label}> Milestones </dt>
							<dd className={styles.list__data}>
								<div className={styles.list__data__rows}>
									<div className={styles.list__item__row}>
										<BlueDiamond />
										<span className={styles.item__text}>
											Claims Amount
											<span className={styles.inner}> ₹25,000</span>
										</span>
									</div>

									<div className={styles.list__item__row}>
										<BlueDiamond />
										<span className={styles.item__text}>
											Approved Amount
											<span className={styles.inner}>₹20,000</span>
										</span>
									</div>

									<div className={styles.list__item__row}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#4fe345" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-check-icon lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
										<span className={styles.item__text}>
											Claim Approved
											<span className={styles.inner}></span>
										</span>
									</div>
								</div>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}

export default FirstCard
