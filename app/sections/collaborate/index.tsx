import { type FC } from "react";
import styles from "./styles.module.css";
import SectionHeading from "@/components/sectionHeading";
import Carousel from "./components/carousel";
import LayoutWrapper from "@/components/layout-wrapper";

const Collaborate: FC = () => {
  return (
    <section className={styles.collaborate}>
      <LayoutWrapper>
        <div className={styles.heading__container}>
          <div className={styles.heading__inner__container}>
            <SectionHeading
              heading="Stay informed with HealthPay Blogs"
              badgeText="Insights and Innovations"
              badgeStyle="bg-[#b59aff] border-none"
            />
          </div>

          <div className={styles.heading__text__container}>
            <p>
              Dive into the latest trends, expert tips, and system updates. Our
              blog helps teams stay ahead with knowledge that empowers smarter
              claim handling, compliance, and care coordination.
            </p>
          </div>
        </div>
      </LayoutWrapper>

      <div className={styles.carousel__container}>
        <Carousel />
      </div>
    </section>
  );
};

export default Collaborate;
