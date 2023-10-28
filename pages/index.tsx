import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { HeroAsset } from "../components/Hero/HeroAsset";
import { MutatingDots } from "react-loader-spinner";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const [rotate, setRotate] = useState(false);
  return (
    <div className={styles.container}>
      {loading ? (
        <i className={styles.threeCircles}>
          <MutatingDots
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </i>
      ) : (
        <div className={styles.content}>
          <div className={styles.hero}>
            <div className={styles.heroBackground}>
              <div className={styles.heroBackgroundInner}>
                {/* <Image
                src="/hero-gradient.png"
                priority
                width={1490}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              /> */}
              </div>
            </div>
            <div>
              <HeroAsset />
            </div>
            <div className={styles.heroBodyContainer}>
              <div className={styles.heroBody}>
                <h1 className={styles.heroTitle}>
                  <span className={styles.heroTitleGradient}>
                    Kolektibles NFT
                    <img
                      className={styles.logo}
                      alt="/"
                      width="150"
                      height="150"
                      src="/logo.png"
                    />
                  </span>
                  <br />
                  Buy and Sell.
                </h1>
                <p className={styles.heroSubtitle}>
                  <Link className={styles.link} href="/" target="">
                    Kolektibles
                  </Link>{" "}
                  gives you the nft you need to collect audited contracts and
                  Quality NFT marketplace for the <b>collections</b>,{" "}
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
      )}
    </div>
  );
};
export default Home;
