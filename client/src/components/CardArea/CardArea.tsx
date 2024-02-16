import React, { useEffect, useState } from "react";
import { cards } from "./CardArea.style";
import { CountryPart2 } from "../../interfaces/Country2.interface";
import { CountryPart1 } from "../../interfaces/Country1.interface";
import { GET_ALL_COUNTRIES } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { prepareDeduplicatedData } from "../../utils/getFormsOfGovernment";
import { Country } from "../../interfaces/Country.interface";
import CountryCard from "../CountryCard/CountryCard";
import Filter from "../Filter/Filter";

function CardArea() {
  const { loading, error, data: country_data_part_1} = useQuery(GET_ALL_COUNTRIES);
  const [ lastCountryIndex, setLastCountryIndex ] = useState<any>([]);
  const [ filteredCountries, setFilteredCountries ] = useState<any>([]);
  const [ countries, setCountries ] = useState<any>([]);
  const [ countryCount, setCountryCount] = useState<number>(0);
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ selectedGovernmentForm, setSelectedGovernmentForm] = useState<string>('');
  const [ selectedContinent, setSelectedContinent ] = useState<string>('');
  const [ selectedCurrency, setSelectedCurrency ] = useState<string>('');
  const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
  const [ selectedWritingDirection, setSelectedWritingDirection ] = useState<string>('');
  const [ selectedGDPRange, setSelectedGDPRange ] = useState<string>('');
  const [ selectedAreaRange, setSelectedAreaRange ] = useState<string>('');
  const [ selectedPopulationRange, setSelectedPopulationRange ] = useState<string>('');

  const fetchData = async () => {
    try {
      const country_data_part_2 = await fetch("http://localhost:5000/api/countries/get-all");
      if (!country_data_part_2.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CountryPart2[] = await country_data_part_2.json();
      const mergedArray = country_data_part_1?.countries.map(
        (country: CountryPart1, index: number) => {
          return {
            shadowIndex: index,
            ...country,
            ...data[index],
          };
        }
      );
      console.log("mergedArray:", mergedArray);
      setCountries(mergedArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [country_data_part_1]);

  useEffect(() => {
       const filtered_countries = countries
          ?.filter((country: Country) => {
            if (selectedLanguage === "") {
              return true; 
            } else {
              return country?.languages?.find(language => language?.name === selectedLanguage); 
            }
          })
          ?.filter((country: Country) => {
            if (selectedWritingDirection === "") {
              return true; 
            } else {
              return country?.languages[0]?.rtl === (selectedWritingDirection === "true");
            }
          })
          ?.filter((country: Country) => {
            if (selectedGDPRange === "") {
              return true; 
            } else {
              if (selectedGDPRange === "low") {
                return country?.gdp < 100; // less than 100 billion
              } else if (selectedGDPRange === "medium") {
                return country?.gdp >= 100 && country?.gdp < 1000; // between 100 billion - 1 trillion
              } else if (selectedGDPRange === "high") {
                return country?.gdp >= 1000; // greater than 1 trillion
              }
            }
          })
          ?.filter((country: Country) => {
            if (selectedAreaRange === "") {
              return true; 
            } else {
              if (selectedAreaRange === "tiny") {
                return country?.area < 100.000; // less than 100.000 km2
              } else if (selectedAreaRange === "small") {
                return country?.area >= 100000 && country?.area < 400000; // between 100.000 km2 - 400.000 km2
              } else if (selectedAreaRange === "medium") {
                return country?.area >= 400000 && country?.area < 700000; // between 400.000 km2 - 700.000 km2
              } else if (selectedAreaRange === "big") {
                return country?.area >= 700000 && country?.area < 1000000; // between 700.000 km2 - 1.000.000 km2
              } else if (selectedAreaRange === "giant") {
                return country?.area >= 1000000; // greater than 1.000.000 km2
              }
            }
          })
          ?.filter((country: Country) => {
            if (selectedPopulationRange === "") {
              return true; 
            } else {
              if (selectedPopulationRange === "sparse") {
                return country?.population < 10000000; // less than 10 million
              } else if (selectedPopulationRange === "medium") {
                return country?.population >= 10000000 && country?.population < 100000000; // between 10 million - 100 million
              } else if (selectedPopulationRange === "crowded") {
                return country?.population >= 100000000 && country?.population < 250000000; // between 100 million - 250 million
              } else if (selectedPopulationRange === "very crowded") {
                return country?.population >= 250000000 // more crowded than 250 million
              } 
            }
          })
          ?.filter((country: Country) => country?.currency?.toLowerCase().includes(selectedCurrency?.toLowerCase()))
          ?.filter((country: Country) => country?.continent?.name?.toLowerCase().includes(selectedContinent?.toLowerCase()))
          ?.filter((country: Country) => country?.form_of_government?.toLowerCase().includes(selectedGovernmentForm?.toLowerCase()))
          ?.filter((country: Country) => country?.name?.toLowerCase().includes(searchTerm?.toLowerCase()))
          
          const indexed_filtered_countries = filtered_countries.map((country: Country, index: number) => {
            return {
              index,
              ...country
            };
          });

          setLastCountryIndex(indexed_filtered_countries.length - 1)
          setFilteredCountries(indexed_filtered_countries);          
  }, [searchTerm, selectedGovernmentForm, selectedContinent, selectedCurrency, selectedLanguage, selectedWritingDirection, selectedGDPRange, selectedAreaRange, selectedPopulationRange]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateUpdater: any = {
      governmentForm: setSelectedGovernmentForm,
      continent: setSelectedContinent,
      currency: setSelectedCurrency,
      language: setSelectedLanguage,
      writingDirection: setSelectedWritingDirection,
      gdpRange: setSelectedGDPRange,
      areaRange: setSelectedAreaRange,
      populationRange: setSelectedPopulationRange
    };
  
    const setSelectedStateByKey = stateUpdater[key];
    setSelectedStateByKey(event.target.value);
  };

  return (
    <>
      <Filter 
          countries={countries}
          searchProps={{ searchTerm: searchTerm, onSearchChange: handleSearch }} 
          governmentFormProps={{ governmentFormOptions: prepareDeduplicatedData(countries, 'form_of_government'), selectedGovernmentForm: selectedGovernmentForm, onValueChangeGovernmentForm: handleChange("governmentForm")}} 
          continentProps={{ continentOptions: prepareDeduplicatedData(countries, 'continent'), selectedContinent: selectedContinent, onValueChangeContinent: handleChange("continent") }}
          currencyProps={{ currencyOptions: prepareDeduplicatedData(countries, 'currency'), selectedCurrency: selectedCurrency, onValueChangeCurrency: handleChange("currency") }}      
          languageProps={{ languageOptions: prepareDeduplicatedData(countries, 'languages'), selectedLanguage: selectedLanguage, onValueChangeLanguage: handleChange("language") }}      
          writingDirectionProps={{ selectedWritingDirection: selectedWritingDirection, onValueChangeWritingDirection: handleChange("writingDirection") }}      
          gdpRangeProps={{ selectedGDPRange: selectedGDPRange, onValueChangeGDPRange: handleChange("gdpRange") }}      
          areaRangeProps={{ selectedAreaRange: selectedAreaRange, onValueChangeAreaRange: handleChange("areaRange") }}      
          populationRangeProps={{ selectedPopulationRange: selectedPopulationRange, onValueChangePopulationRange: handleChange("populationRange") }}      
      />
      <hr style={{ marginBottom: '20px' }} />
      <div style={cards}>
        {filteredCountries.length == 0 ? 
          countries?.map((country: Country) => (
            <CountryCard
              key={country?.name}
              country_data={country}
              country_count={countryCount}
              last_country_index={lastCountryIndex}
            />
          )):
          filteredCountries?.map((country: Country) => (
            <CountryCard
              key={country?.name}
              country_data={country}
              country_count={countryCount}
              last_country_index={lastCountryIndex}
            />
          )) }
      </div>
    </>
  );
}

export default CardArea;
