/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../styles/NftExplorer.module.css";
import { useAddress } from "@thirdweb-dev/react";
import { MutatingDots } from "react-loader-spinner";

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

interface NFTExplorerProps {}

export default function NFTExplorer(props: NFTExplorerProps) {
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
        setWalletOrCollectionAddress('connected wallet');
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
            <div onClick={() => fetchNFTs()} className={styles.button_black}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                height="1.7em"
                viewBox="0 -10 500 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </div>
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
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading_box}>
          
          
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
