import React,{useState, useEffect} from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";



export function Navbar() {
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    console.log("Toggling dropdown state");
    setIsOpen(!isOpen);
  };
  useEffect(() => {
     console.log("Component mounted, isOpen:", isOpen);
    setIsOpen(true);
  }, []);
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.hideMenu}>
          <svg
            onClick={toggleDropdown}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            height="2em"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          {!isOpen && (
            <div className={styles.hideMenuList}>
              <Link href="/buy">Buy</Link>
              <Link href="/sell">Sell</Link>
              <Link href="/NftExplorer">NFT Explorer</Link>
            </div>
          )}
        </div>

        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              priority={true}
              src="/logo.png"
              width={78}
              height={78}
              alt="NFT marketplace sample logo"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy" className={styles.link}>
              Buy
            </Link>
            <Link href="/sell" className={styles.link}>
              Sell
            </Link>
            <Link href="/NftExplorer" className={styles.link}>
              NFT Explorer
            </Link>
          </div>
        </div>
        
        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
