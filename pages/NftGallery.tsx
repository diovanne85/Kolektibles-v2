/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../styles/NftGallery.module.css";
import { useAddress } from "@thirdweb-dev/react";


interface NFT {
  format: string;
  media: string;
  title: string;
  symbol: string;
  verified: string;
  contract?: string;
  description: string;
  collectionName: string;
  tokenId:string;
}

interface NFTGalleryProps {}

export default function NFTGallery(props: NFTGalleryProps) {
  const [nfts, setNfts] = useState<NFT[] | undefined>();
  const [walletOrCollectionAddress, setWalletOrCollectionAddress] =
    useState<string>("moistowl.eth");
  const [fetchMethod, setFetchMethod] = useState("wallet");
  const [pageKey, setPageKey] = useState<string | undefined>();
  const [spamFilter, setSpamFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const address = useAddress();
  const [chain, setChain] = useState(
    process.env.NEXT_PUBLIC_ALCHEMY_NETWORK
  );

  const changeFetchMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNfts(undefined);
    setPageKey(undefined);
    switch (event.target.value) {
      case "wallet":
        setWalletOrCollectionAddress("moistowl.eth");
        break;
      case "collection":
        setWalletOrCollectionAddress(
          "0xf07468eAd8cf26c752C676E43C814FEe9c8CF402"
        );
        break;
      case "connectedWallet":
        setWalletOrCollectionAddress('address');
        break;
    }
    setFetchMethod(event.target.value);
  };

  const fetchNFTs = async (pageKey?: string) => {
    if (!pageKey) setIsLoading(true);
    const endpoint =
      fetchMethod === "wallet" || fetchMethod === "connectedWallet"
        ? "/api/getNftsForOwner"
        : "/api/getNftsForCollection";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          address:
            fetchMethod === "connectedWallet"
              ? address
              : walletOrCollectionAddress,
          pageKey: pageKey ? pageKey : null,
          chain: chain,
          excludeFilter: spamFilter,
        }),
      }).then((res) => res.json());
      if (nfts?.length && pageKey) {
        setNfts((prevState) => [...(prevState || []), ...res.nfts]);
      } else {
        setNfts(res.nfts);
      }
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey(undefined);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, [fetchMethod]);
  useEffect(() => {
    fetchNFTs();
  }, [spamFilter]);

  return (
    <div className={styles.nft_gallery_page}>
      <div>
        <div className={styles.fetch_selector_container}>
          <h2 style={{ fontSize: "20px" }}>Explore NFTs by</h2>
          <div className={styles.select_container}>
            <select
              defaultValue={"wallet"}
              onChange={(e) => {
                changeFetchMethod(e);
              }}
            >
              <option value={"wallet"}>wallet</option>
              <option value={"collection"}>collection</option>
              <option value={"connectedWallet"}>connected wallet</option>
            </select>
          </div>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            <input
              value={walletOrCollectionAddress}
              onChange={(e) => {
                setWalletOrCollectionAddress(e.target.value);
              }}
              placeholder="Insert NFTs contract or wallet address"
            ></input>
            <div className={styles.select_container}>
              <select
                onChange={(e) => {
                  setChain(e.target.value);
                }}
                defaultValue={process.env.NEXT_PUBLIC_ALCHEMY_NETWORK}
              >
                <option value={"ETH_MAINNET"}>Mainnet</option>
                <option value={"MATIC_MAINNET"}>Polygon</option>
                <option value={"ETH_GOERLI"}>Goerli</option>
                <option value={"MATIC_MUMBAI"}>Mumbai</option>
              </select>
            </div>
            <div onClick={() => fetchNFTs()} className={styles.button_black}>
              <a>Search</a>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.nft_gallery}>
          {nfts?.length && fetchMethod !== "collection" && (
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <p>Hide spam</p>
              <label className={styles.switch}>
                <input
                  onChange={(e) => setSpamFilter(e.target.checked)}
                  checked={spamFilter}
                  type="checkbox"
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          )}

          <div className={styles.nfts_display}>
            {nfts?.length ? (
              nfts.map((nft, index) => {
                return <NftCard key={index} nft={nft} />;
              })
            ) : (
              <div className={styles.loading_box}>
                <p>No NFTs found for the selected address</p>
              </div>
            )}
          </div>
        </div>
      )}

      {pageKey && nfts?.length && (
        <div>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}

interface NftCardProps {
  nft: NFT;
}

function NftCard({ nft }: NftCardProps) {
  return (
    <div className={styles.card_container}>
      
      <div className={styles.image_container}>
        {nft.format === "mp4" ? (
          <video src={nft.media} controls>
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={nft.media} alt={nft.title} />
        )}
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{nft.title}</h3>
          <h3>{nft.collectionName}</h3>
        </div>
        <hr className={styles.separator} />
        <div className={styles.symbol_contract_container}>
          <div className={styles.symbol_container}>
            <p>{nft.symbol}</p>

            {nft.verified === "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
                alt="Verified"
              />
            ) : null}
          </div>
        
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>
              {nft.contract?.slice(0, 6)}...
              {nft.contract?.slice(38)}
            </p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
              alt="Etherscan"
            />
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  );
}
