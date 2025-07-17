import { type FC } from "react";
import SectionHeading from "@/components/sectionHeading";
import {
  BentoGrid,
  BentoGridFeatureLookupWrapper,
  BentoGridSeperator,
  BentoGridTopLayer,
  BentoGridWideCardWrapper,
} from "@/components/bento-grid";
import styles from "./styles.module.css";
import BentoCardLeft from "@/components/bento-grid/components/bento-grid-card-left";
import BentoGridCardRight from "@/components/bento-grid/components/bento-grid-card-right";
import FirstCard from "./components/first-card";
import SecondCard from "./components/second-card";
import WideCard from "./components/wide-card";
import BentoGridFeatureLookUpCard from "@/components/bento-grid/components/bento-grid-feature-lookup-card";
import { issueTrackingFeatureLookup } from "./feature-lookup-data";
import LayoutWrapper from "@/components/layout-wrapper";

const IssueTracking: FC = () => {
  return (
    <section className={styles.issue__tracking}>
      <LayoutWrapper>
        <div className={styles.heading__container}>
          <div className={styles.heading__inner__container}>
            <SectionHeading
              heading="Smarter claims workflows you’ll enjoy using"
              badgeText="Claims tracking and case coordination"
              badgeStyle="bg-[#D4B144] border-none"
            />

            <div>
              <p>
                <span>
                  Submit claims, get instant validation, track status live
                </span>{" "}
                No more manual uploads or chasing documents. Let automation
                handle the heavy lifting—from extraction to approval.
              </p>
            </div>
          </div>
        </div>
      </LayoutWrapper>

      {/* <div className={styles.hero__img__wrapper}>
				<Image
					src='/issue-tracking-hero.png'
					alt=''
					width={3200}
					height={1620}
				/>
			</div> */}

      <LayoutWrapper>
        <BentoGrid>
          <BentoGridTopLayer>
            <BentoCardLeft
              title="Accelerate claims with Smart Routing"
              description="Automatically direct claims to the right team or reviewer based on policy type, urgency, or required expertise."
            >
              <FirstCard />
            </BentoCardLeft>
            <BentoGridCardRight
              title="Manage incoming work with Triage"
              description="Instantly verify patient eligibility and coverage details before claim processing begins—saving time and avoiding denials."
            >
              <SecondCard />
            </BentoGridCardRight>
          </BentoGridTopLayer>

          <BentoGridWideCardWrapper>
            <WideCard />
          </BentoGridWideCardWrapper>

          <BentoGridSeperator />

          <BentoGridFeatureLookupWrapper>
            {issueTrackingFeatureLookup.map((featureLookup) => (
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

export default IssueTracking;
