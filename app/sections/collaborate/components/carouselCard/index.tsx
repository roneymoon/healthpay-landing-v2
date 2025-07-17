"use client"
import { type FC } from 'react'
import styles from './styles.module.css'
import { Plus } from 'lucide-react'
import Lottie from 'lottie-react'
const CarouselCard: FC = () => {
	return (
		<div className={styles.card}>
			<div className={styles.img__container}>
				<div className={styles.img__wrapper}>
					<Lottie
						animationData={require('@/assets/carouselAnimation1.json')}
						loop={true}
						autoplay={true}
					/>
				</div>
			</div>

			<div className={styles.content__container}>
				<div className={styles.card__heading__container}>
					<h3> Patient Support & Financing </h3>
					<p> Benefits of Healthcare Financing: A Debt-Free Recovery</p>
				</div>

				<button className={styles.icon__button}>
					<Plus />
				</button>
			</div>
		</div>
	)
}

export default CarouselCard
