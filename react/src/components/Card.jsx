import React from "react";
import styles from "./Card.module.css";

export default function Card(props) {
  const name = props.data[0].replaceAll('_', ' ').split('.')[0].slice(0,12).toUpperCase();
  console.log(name)
  return (
    <div className={styles.card}>
      <div>
        <img src={`/public/images/${props.data[0]}`} alt={`${props.data[0]}`} />
      </div>
      <div className={styles.details}>
        <h1>{name}</h1>
        <p>&#8377;{props.data[1]}</p>
      </div>
    </div>
  )
}
