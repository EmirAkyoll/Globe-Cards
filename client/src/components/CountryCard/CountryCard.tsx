import React, { useEffect, useState } from 'react'
import { randomLinearGradient } from '../../utils/randomLinearGradient';
import { formatNumber } from '../../utils/numbersRestructure';
import { country_name, card_body, card_footer, card_header, emoji, flag, bookmarking_button, 
         bookmark_icon, rotate_button, rotate_icon, flip_card_back, flip_card_front, flip_card_inner,
         card_back_header} from './CountryCard.style'

function CountryCard({ country_data, country_count, last_country_index }: any) {  
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const [colors, setColors] = useState<any>(country_data?.background[0]?.colors);
  const [originalColors, setOriginalColors] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const card: any = {
    backgroundBlendMode: 'multiply',
    background: `linear-gradient(${country_data?.background[0]?.direction},${colors}), rgba(0, 0, 0, 0.2)`,
    backGroundColor: 'transparent',
    perspective: '1000px',
    fontSize: '14px',
    width: "220px",
    height: "275px",  
    border: "1px solid black",
    borderRadius: "8px",
    paddingTop: "0",
    position: "relative",
    color: 'white',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.5s', 
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  };

  const card_back_body: any = {
    maxWidth: '210px',
    height: '240px',
    position: 'absolute',
    top: '-225px',
    backgroundBlendMode: 'multiply',
    textAlign: 'justify',
    paddingRight: '10px',
    background: `url('${country_data?.silhouette_url}'), rgba(0,0,0,0.5)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    objectFit: "cover"
  };

  useEffect(() => {
    console.log("GARD: ", last_country_index);
    console.log("index: ", country_data?.index);
    
    if ((country_data?.shadowIndex === 9) || (last_country_index === 9) || (country_data?.index === last_country_index && last_country_index < 9)) {
      markIt(country_data?.background[0]?.colors)
    }
    // if (last_country_index === 9) {
    //   markIt(country_data?.background[0]?.colors)
    // }
    // if (country_data?.index === last_country_index && last_country_index < 9) {
    //   markIt(country_data?.background[0]?.colors)
    // }
  }, [last_country_index]);

  const languagesInAbbreviatedForm = () => {
    const languageCount = country_data?.languages.length;
    let displayedLanguages = country_data?.languages.slice(0, 1).map((language: any) => language.name).join(', ');
    let additionalLanguages = languageCount - 1;
    if (additionalLanguages > 0) {
      displayedLanguages += ` +${additionalLanguages} more`;
    }
    return displayedLanguages;
  }

  const languagesAll = () => {
    const languages: string[] = [];
    country_data?.languages.map((language: any)=>{
      languages.push(" "+language?.name)
    });
    return languages;
  }

  // it is for background image's visibility
  const text = "-------------------------------------------------------"

  const dataInAbbreviatedForm = (data: string) => {
    const fragmentedCurrencies = data?.split(",");
    if (fragmentedCurrencies?.length === 1) {
        return fragmentedCurrencies[0];
    }
    const firstPart = fragmentedCurrencies?.shift();
    const remainingCount = fragmentedCurrencies?.length;
    const result = firstPart + " +" + remainingCount;
    return result;
  }

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
  
  const rotateTheCard = () => {
    setIsFlipped(!isFlipped);
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
        <button style={rotate_button} onClick={() => rotateTheCard()}>
          <img style={rotate_icon} src="https://res.cloudinary.com/dabd62oib/image/upload/v1707744603/vgzbfhcjxp0luviuu8gi.png" alt="bookmarking" />
        </button>
       <div style={flip_card_inner}>
        <div style={flip_card_front}>
        <div style={card_header}>
            <img src={country_data?.flag_url} alt={country_data.name} style={flag} />
            <span style={emoji}>{country_data?.emoji}</span>
            <b data-tooltip={`${country_data?.name} (${country_data?.native})`} style={country_name}>{country_data?.name}</b>
        </div>
        <div style={card_body}>
            <b style={{marginBottom: '10px'}}>{country_data?.form_of_government}</b>
          <div><b>Capital:</b> {country_data?.capital}</div>
          <div><b>GDP:</b> {country_data?.gdp} Billion</div>
          <div><b>Population:</b> {formatNumber(country_data?.population)}</div>
          <div><b>Area:</b> {formatNumber(country_data?.area)} <small>km<sup>2</sup></small></div>
          <div><b>Continent:</b> {country_data?.continent.name}</div>
          <div><b>Lang\s:</b> <span data-tooltip={languagesAll()}>{languagesInAbbreviatedForm()}</span></div>
        </div>
        <div style={card_footer}>
              <span style={{marginRight: '25px'}}>
                <b>Code:</b> 
                <span data-tooltip={country_data?.phone}> +{dataInAbbreviatedForm(country_data?.phone)}</span>
              </span>
              <span style={{marginLeft: '25px'}}>
                <b style={{marginRight: '5px'}}>{country_data.currency_sign}</b> 
                <span data-tooltip={country_data?.currency}>{dataInAbbreviatedForm(country_data?.currency)}</span>
              </span>
        </div>
        </div>
        <div style={flip_card_back}>
          <div style={card_back_header}>
              <img src={country_data?.flag_url} alt={country_data.name} style={flag} />
              <span style={emoji}>{country_data?.emoji}</span>
              <b data-tooltip={`${country_data?.name} (${country_data?.native})`} style={country_name}>{country_data?.name}</b>
          </div>
          <div style={card_back_body}>
            <span style={{color: '#666666'}}>{text}</span>
          </div>
        </div>
       </div>
    </div>
  )
}

export default CountryCard;
