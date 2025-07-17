'use client'

import { useEffect, useState, type FC } from 'react'
import Image from 'next/image'
import GridCell from './grid-cell'

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

const CustomerList: FC = () => {
	const [layer, setLayer] = useState<number>(1)

	useEffect(() => {
		const changeLayer = () => setLayer((prev) => (prev % 3) + 1)
		const interval = setInterval(changeLayer, 3000)

		return () => clearInterval(interval)
	}, [])

	const createLogoElement = (src: any, alt: string) => (
		<div className={styles.logo__wrapper}>
			<Image
				src={src}
				alt={alt}
				width={120}
				height={60}
				className={styles.logo}
			/>
		</div>
	)

	return (
		<div className={styles.customer__grid}>
			<div className={styles.logo__grid}>
				<GridCell
					layer={layer}
					icon1={createLogoElement(Logo1, 'TPA Partner 1')}
					icon2={createLogoElement(Logo2, 'TPA Partner 2')}
					icon3={createLogoElement(Logo3, 'TPA Partner 3')}
				/>
				<GridCell
					layer={layer}
					icon1={createLogoElement(Logo4, 'TPA Partner 4')}
					icon2={createLogoElement(Logo5, 'TPA Partner 5')}
					icon3={createLogoElement(Logo6, 'TPA Partner 6')}
				/>
				<GridCell
					layer={layer}
					icon1={createLogoElement(Logo7, 'TPA Partner 7')}
					icon2={createLogoElement(Logo8, 'TPA Partner 8')}
					icon3={createLogoElement(Logo9, 'TPA Partner 9')}
				/>
				<GridCell
					layer={layer}
					icon1={createLogoElement(NHA, 'NHA Certified')}
					icon2={createLogoElement(NABH, 'NABH Certified')}
					icon3={createLogoElement(HIPAA, 'HIPAA Compliant')}
				/>
				<GridCell
					layer={layer}
					icon1={createLogoElement(Logo1, 'TPA Partner 1')}
					icon2={createLogoElement(Logo4, 'TPA Partner 4')}
					icon3={createLogoElement(Logo7, 'TPA Partner 7')}
				/>
				<GridCell
					layer={layer}
					icon1={createLogoElement(Logo2, 'TPA Partner 2')}
					icon2={createLogoElement(Logo5, 'TPA Partner 5')}
					icon3={createLogoElement(Logo8, 'TPA Partner 8')}
				/>
			</div>
		</div>
	)
}

export default CustomerList
