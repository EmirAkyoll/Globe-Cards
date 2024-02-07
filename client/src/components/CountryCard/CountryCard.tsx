import React from 'react'
import styles from './CountryCard.module.css'
import { card_footer, card_header, emoji, flag } from './CountryCard.style'


function CountryCard({ country_data }: any) {

  const card: any = {
    backgroundColor: "bisque",
    width: "250px",
    height: "250px",
    border: "1px solid black",
    borderRadius: "8px",
    padding: "10px",
    position: "relative",
  };

  return (
    <div style={card}>
        <div style={card_header}>
            <img
               src={country_data?.flag_url} 
               alt={country_data.name} 
               style={flag}
            />
            <span style={emoji}>{country_data?.emoji}</span>
            <span>{country_data?.name}</span>
            <span>{country_data?.population}</span>
        </div>
        <div style={card_footer}>
            <span>Code: +{country_data?.phone}</span>
            <span>{country_data?.currency} {country_data.currency_sign}</span>
        </div>
    </div>
  )
}

export default CountryCard;
