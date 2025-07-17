import { type FC } from 'react'
import Image from 'next/image'

// Import TPA logos
import Logo1 from '@/assets/tpa/logo1.png'
import Logo2 from '@/assets/tpa/logo2.png'
import Logo3 from '@/assets/tpa/logo3.png'
import Logo4 from '@/assets/tpa/logo4.png'
import Logo5 from '@/assets/tpa/logo5.png'
import Logo6 from '@/assets/tpa/logo6.png'
import Logo7 from '@/assets/tpa/logo7.png'
import Logo8 from '@/assets/tpa/logo8.png'
import Logo9 from '@/assets/tpa/logo9.png'
import NHA from '@/assets/tpa/NHA.png'
import NABH from '@/assets/tpa/NABH_2.png'
import HIPAA from '@/assets/tpa/HIPAA.png'

import styles from './styles.module.css'

const CustomerMarquee: FC = () => {
	const logos = [
		{ src: Logo1, alt: 'TPA Partner 1' },
		{ src: Logo2, alt: 'TPA Partner 2' },
		{ src: Logo3, alt: 'TPA Partner 3' },
		{ src: Logo4, alt: 'TPA Partner 4' },
		{ src: Logo5, alt: 'TPA Partner 5' },
		{ src: Logo6, alt: 'TPA Partner 6' },
		{ src: Logo7, alt: 'TPA Partner 7' },
		{ src: Logo8, alt: 'TPA Partner 8' },
		{ src: Logo9, alt: 'TPA Partner 9' },
		{ src: NHA, alt: 'NHA Certified' },
		{ src: NABH, alt: 'NABH Certified' },
		{ src: HIPAA, alt: 'HIPAA Compliant' },
	];

	return (
		<div className={styles.marquee}>
			<div className={styles.marquee__container}>
				<div className={styles.marquee__inner__container}>
					{logos.map((logo, index) => (
						<div key={index} className={styles.logo__wrapper}>
							<Image
								src={logo.src}
								alt={logo.alt}
								className={styles.logo}
								width={120}
								height={60}
							/>
						</div>
					))}
				</div>

				<div className={styles.marquee__inner__container}>
					{logos.map((logo, index) => (
						<div key={`repeat-${index}`} className={styles.logo__wrapper}>
							<Image
								src={logo.src}
								alt={logo.alt}
								className={styles.logo}
								width={120}
								height={60}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CustomerMarquee
