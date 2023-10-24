import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { motion } from "framer-motion"
import { useState } from "react";
import { HeroAsset } from "../components/Hero/HeroAsset";


const Home: NextPage = () => {
  const [rotate, setRotate] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              <Image
                src="/hero-gradient.png"
                priority
                width={1490}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          <div>
            <HeroAsset />
          </div>
          {/* <motion.div
            className={styles.heroAssetFrame}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.1,
              ease: [0.5, 0.71, 0.2, 0.51],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 80,
                restDelta: 0.005,
                repeat:Infinity,
                repeatDelay:0.1,
              },
            }}
          >
            <Image
              src="/hero-asset.png"
              width={460}
              height={440}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </motion.div> */}
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Kolektibles NFT Marketplaces
                </span>
                <br />
                faster than ever.
              </h1>
              <p className={styles.heroSubtitle}>
                <Link className={styles.link} href="/" target="">
                  Kolektibles
                </Link>{" "}
                gives you the nft you need to collect audited contracts and
                Quality NFT marketplaces for the <b>collections</b>,{" "}
                <i>not Prices</i>.
              </p>

              <div className={styles.heroCtaContainer}>
                <Link className={styles.heroCta} href="/buy">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
