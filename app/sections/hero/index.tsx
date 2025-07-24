"use client";

import { type FC } from "react";
import styles from "./styles.module.css";
import LayoutWrapper from "@/components/layout-wrapper";
import BlurPopUpByWord from "@/components/blur-pop-up-by-words";
import { cn } from "@/lib/utils";
import BlurPopUp from "@/components/blur-pop-up";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// import Lottie from "lottie-react";
// import DashboardAnimation from "@/assets/Dashboard.json";

// import Sidebar from "./components/sidebar";
// import IllustrateAnimate from "@/components/illustrate-animate";

import TenMillion from "@/assets/10m.png";

const Hero: FC = () => {
	return (
		<section className={styles.hero}>
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
			<LayoutWrapper>
				<h1 className={cn(styles.heading, styles.hide__mobile)}>
					<BlurPopUpByWord text="AI-Powered Claims Engine for India&apos;s Health Insurance Ecosystem" />
				</h1>

				<h1 className={cn(styles.heading, styles.show__mobile)}>
					<BlurPopUpByWord text="Reimagining Health Insurance Claims with AI" />
				</h1>

				<BlurPopUp delay={1}>
					<h2 className={cn(styles.sub__heading)}>
						HealthPay automates adjudication across pre-auth, non-medico,
						medico, and audit workflows — reducing cost and turnaround time by
						over 70%.
					</h2>
					<h2 className={cn(styles.sub__heading, styles.show__mobile)}>
						Process claims in just 5 minutes with &gt;94% accuracy. Cut
						operational costs, boost compliance, and scale effortlessly.
					</h2>
				</BlurPopUp>

				<div className={styles.button__container}>
					<BlurPopUp delay={1.1}>
						<Link className={styles.start__link} href="#contact">
							Get a Demo
						</Link>
					</BlurPopUp>

					<BlurPopUp delay={1.15}>
						<Link className={styles.intoducing__link} href="#founders">
							<span>Meet the Founders</span>
							<ChevronRight />
						</Link>
					</BlurPopUp>
				</div>

				<div className={styles.stats__container}>
					<div className={styles.stats__inner}>
						<div className={styles.stats__image_wrapper}>
							<h3 className={styles.stats__heading}>
								HealthPay saves teams over <br />
								<span className={styles.gradient__text}>10 million hours</span> every single year
							</h3>
							<Image 
								src={TenMillion} 
								alt="Ten Million Claims Processed"
								className={styles.stats__image}
							/>	
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</section>
	);
};

export default Hero;
