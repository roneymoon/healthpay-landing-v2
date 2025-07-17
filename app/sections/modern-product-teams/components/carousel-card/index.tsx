"use client"

import { type FC } from 'react'
import styles from './styles.module.css'
import { Plus } from 'lucide-react'
import Lottie from 'lottie-react'

export interface CarouselCardProps {
	id: string
	img: any // or AnimationItem for Lottie
	title: string
}

const CarouselCard: FC<CarouselCardProps> = ({ img, title }) => {
	return (
		<div className={styles.carousel__card}>
			<button className={styles.outter__container}>
				<div className={styles.img__container}>
					<Lottie animationData={img} loop={true} autoplay={true} />
				</div>
				<div className={styles.text__container}>
					<div className={styles.title}>
						<span> {title} </span>
					</div>

					<div className={styles.icon__container}>
						<Plus />
					</div>
				</div>
			</button>
		</div>
	)
}

export default CarouselCard
