import { type FC } from "react";
import styles from "./styles.module.css";
import LayoutWrapper from "@/components/layout-wrapper";
import SectionHeading from "@/components/sectionHeading";
import Link from "next/link";
import {
  BentoGrid,
  BentoGridFeatureLookupWrapper,
  BentoGridSeperator,
  BentoGridTopLayer,
  BentoGridWideCardWrapper,
} from "@/components/bento-grid";
import BentoCardLeft from "@/components/bento-grid/components/bento-grid-card-left";
import BentoGridCardRight from "@/components/bento-grid/components/bento-grid-card-right";
import BentoGridFeatureLookUpCard from "@/components/bento-grid/components/bento-grid-feature-lookup-card";
import { longTermFeatureLookup } from "./feature-lookup-data";
import FirstCard from "./components/first-card";
import SecondCard from "./components/second-card";
import WideCard from "./components/wide-card";

const LongTermPlanning: FC = () => {
  return (
    <section className={styles.long__term__planning}>
      <LayoutWrapper>
        <div className={styles.heading__container}>
          <div className={styles.heading__inner__container}>
            <Link href="/">
              <SectionHeading
                heading="India's first AI intergrated RCM solution"
                badgeText="Smart Claim System"
                badgeStyle="bg-[#68CC58] border-none"
              />
            </Link>
          </div>
          <div className={styles.description__container}>
            <p>
              <span>
                Streamline your claims and member management with ease.
              </span>{" "}
              HealthPay empowers insurers and providers with advanced tools to
              track, manage, and automate healthcare claims efficiently.
            </p>
          </div>
        </div>
        {/* <div className={styles.hero__img__wrapper}>
          <Image src="/roadmap.png" alt="" width={3200} height={1620} />
        </div> */}
      </LayoutWrapper>

      <LayoutWrapper>
        <BentoGrid>
          <BentoGridTopLayer>
            <BentoCardLeft
              title="Handle claims from start to finish"
              description="Manage patient data, claim statuses, documentation, and approvals in a single dashboard."
            >
              <FirstCard />
            </BentoCardLeft>
            <BentoGridCardRight
              title="Live status updates"
              description="Communicate claim progress and approval timelines with real-time updates and notifications."
            >
              <SecondCard />
            </BentoGridCardRight>
          </BentoGridTopLayer>

          <div className="h-6"></div>

          <BentoGridWideCardWrapper>
            <WideCard />
          </BentoGridWideCardWrapper>

          <BentoGridSeperator />

          <BentoGridFeatureLookupWrapper>
            {longTermFeatureLookup.map((featureLookup) => (
              <BentoGridFeatureLookUpCard
                key={featureLookup.id}
                {...featureLookup}
              />
            ))}
          </BentoGridFeatureLookupWrapper>
        </BentoGrid>
      </LayoutWrapper>
    </section>
  );
};

export default LongTermPlanning;
