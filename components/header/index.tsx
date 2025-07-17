import { type FC } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import styles from './styles.module.css'
import Image from 'next/image'
import healthpay from '@/assets/healthpay.png'

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header__blur__mask}></div>
			<div className={styles.header__overlay}></div>
			<header className={styles.header__wrapper}>
				<nav className={styles.header__root}>
					<div className='relative'>
						<ul className={styles.header__list}>
							{/* HealthPay Logo - Stays on the left */}
							<li className={cn(styles.header__logo, styles.header__item)}>
								<Link href='/' className={cn(styles.header__logo__link)}>
									<div className="flex flex-row items-center gap-2 text-blue-200 font-bold text-xl">
										<Image src={healthpay} alt="HealthPay Logo" className="w-7 h-7" />
										<p className={cn(styles.header__logo__text, styles.heading)}>
											HealthPay
										</p>
									</div>
								</Link>
							</li>

							{/* Navigation Links - Grouped for centering */}
							<div className={styles['header__nav-links']}>
								<li className={cn(styles.hide__mobile, styles.header__trigger)}>
									<Link className={styles.header__link} href='#'>
										Features
									</Link>
								</li>

								<li className={cn(styles.hide__laptop, styles.header__item)}>
									<Link className={styles.header__link} href='#'>
										Pricing
									</Link>
								</li>

								<li className={cn(styles.hide__laptop, styles.header__item)}>
									<Link className={styles.header__link} href='#'>
										Customers
									</Link>
								</li>

								<li className={cn(styles.hide__tablet, styles.header__item)}>
									<Link className={styles.header__link} href='#'>
										FAQs
									</Link>
								</li>

								<li className={cn(styles.hide__tablet, styles.header__item)}>
									<Link className={styles.header__link} href='#'>
										Contact
									</Link>
								</li>
							</div>

							{/* Buttons - Grouped to be side-by-side on the right */}
							<div className={styles['header__buttons-group']}>
								{/* Learn More Button */}
								<li> {/* No more header__item, header__button, header__login here for simplicity */}
									<Link
										className={cn(styles.header__primary_button, styles.header__learnmore_button)}
										href='#'>
										Learn More
									</Link>
								</li>

								{/* Try Free Button */}
								<li> {/* No more header__item, header__button, header__signup here for simplicity */}
									<Link
										className={cn(styles.header__primary_button, styles.header__tryfree_button)}
										href='#'>
										Try Free
									</Link>
								</li>
							</div>

							{/* Mobile Menu Button */}
							<li className={cn(styles.header__item, styles.header__button, styles.header__menu)}>
								<button aria-label="Toggle Menu">
									<Menu />
								</button>
							</li>

						</ul>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default Header