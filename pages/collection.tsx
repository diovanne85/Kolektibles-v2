/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from '../styles/Collections.module.css'


export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "2b93cb9a575542ceb297d117d1d29cf9",
    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.opensea.io/api/v2/collections?chain_identifier=sepolia&include_hidden=false&limit=100",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setCollections(data.collections); // Assuming the response has a 'collections' property
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.collection}>
      {collections.map((collection, i) => (
        <div key={i} className={styles.blogCard}>
          <div className={styles.card}>
            <img
              src={collection.photo_url} // Use 'collection' instead of 'c'
              alt={collection.name} // Set the alt text to the collection name or an appropriate description
              className={styles.image}
            />
            <div className={styles.blogDetails}>
              <span className={styles.title}>{collection.name}</span>
              <div className={styles.category}>{collection.category}</div>
              <span className={styles.createdAt}>{collection.created_at}</span>
              <p className={styles.contentText}>{collection.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
