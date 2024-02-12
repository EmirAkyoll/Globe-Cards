import React, { useEffect, useState } from 'react'
import { country_name, card_body, card_footer, card_header, emoji, flag, bookmarking_button, bookmark_icon, rotate_button, rotate_icon } from './CountryCard.style'
import { randomLinearGradient } from '../../utils/randomLinearGradient';
import { formatNumber } from '../../utils/numbersRestructure';

function CountryCard({ country_data }: any) {  
  const [colors, setColors] = useState<any>(country_data?.background[0]?.colors);
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const [originalColors, setOriginalColors] = useState<string[]>([]);

  const card: any = {
    backgroundBlendMode: 'multiply',
    background: `linear-gradient(${country_data?.background[0]?.direction},${colors}), rgba(0, 0, 0, 0.2)`,
    fontSize: '14px',
    width: "220px",
    height: "275px",  
    border: "1px solid black",
    borderRadius: "8px",
    padding: "7px",
    paddingTop: "0",
    position: "relative",
    color: 'white',
  };

  useEffect(() => {
    if (country_data?.index === 9) {
      markIt(country_data?.background[0]?.colors)
    }
  }, []);

  const changeBackgroundColor = () => {
    const randomColor = randomLinearGradient()
    setColors(randomColor);
  }
  
  const markIt = (original_colors: string[]) => {
    setIsMarked(true);
    setOriginalColors(original_colors)
    changeBackgroundColor();
  }
  
  const unMarkIt = () => {
    setIsMarked(false);
    setColors(originalColors);
  }

  return (
    <div style={card}>
        {!isMarked && (<button style={bookmarking_button} onClick={() => markIt(country_data?.background[0]?.colors)}>
                         <img style={bookmark_icon} src="https://res.cloudinary.com/dabd62oib/image/upload/v1707686255/x8callp3ktuywaytbkne.png" alt="bookmarking" />
                        </button>
                      )
        }
        {isMarked && (<button style={bookmarking_button} onClick={() => unMarkIt()}>
                         <img style={bookmark_icon} src="https://res.cloudinary.com/dabd62oib/image/upload/v1707686252/d8vg1zjgxdeslvdstvyf.png" alt="bookmarking" />
                        </button>
                      )
        }
        <button style={rotate_button} onClick={() => unMarkIt()}>
          <img style={rotate_icon} src="https://res.cloudinary.com/dabd62oib/image/upload/v1707744603/vgzbfhcjxp0luviuu8gi.png" alt="bookmarking" />
        </button>
        <div style={card_header}>
            <img src={country_data?.flag_url} alt={country_data.name} style={flag} />
            <span style={emoji}>{country_data?.emoji}</span>
            <b title={country_data?.name} style={country_name}>{country_data?.name}</b>
        </div>            
        <div style={card_body}>
            <b style={{marginBottom: '10px'}}>{country_data?.form_of_government}</b>
          <div><b>Capital:</b> {country_data?.capital}</div>
          <div><b>GDP:</b> {country_data?.gdp} Billion</div>
          <div><b>Population:</b> {formatNumber(country_data?.population)}</div>
          <div><b>Area:</b> {formatNumber(country_data?.area)} <small>km<sup>2</sup></small></div>
        </div>
        <div style={card_footer}>
              <span style={{marginRight: '25px'}}><b>Code:</b> +{country_data?.phone}</span>
              <span style={{marginLeft: '25px'}}>{country_data?.currency} <b>{country_data.currency_sign}</b></span>
        </div>
    </div>
  )
}

export default CountryCard;
