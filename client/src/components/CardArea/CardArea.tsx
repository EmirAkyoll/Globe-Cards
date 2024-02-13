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
  const [ countries, setCountries ] = useState<any>([]);
  const [ countryCount, setCountryCount] = useState<number>(0);
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [ selectedGovernmentForm, setSelectedGovernmentForm] = useState<string>('');
  const [ selectedContinent, setSelectedContinent ] = useState<string>('');
  const [ selectedCurrency, setSelectedCurrency ] = useState<string>('');
  const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const country_data_part_2 = await fetch("http://localhost:5000/api/countries/get-all");
        if (!country_data_part_2.ok) {
          throw new Error("Network response was not ok");
        }
        const data: CountryPart2[] = await country_data_part_2.json();
        const mergedArray = country_data_part_1?.countries.map(
          (country: CountryPart1, index: number) => {
            console.log("languages:", country?.languages);
            return {
              index,
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

    fetchData();

    console.log("countries: ", countries);
    console.log("RATATOR: ", country_data_part_1);
  }, [country_data_part_1]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGovernmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGovernmentForm(event.target.value);
  };
  
  const handleContinentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedContinent(event.target.value);
  };
  
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <Filter 
          countries={countries}
          searchProps={{ searchTerm: searchTerm, onSearchChange: handleSearch }} 
          governmentFormProps={{ governmentFormOptions: prepareDeduplicatedData(countries, 'form_of_government'), selectedGovernmentForm: selectedGovernmentForm, onValueChangeGovernmentForm: handleGovernmentChange}} 
          continentProps={{ continentOptions: prepareDeduplicatedData(countries, 'continent'), selectedContinent: selectedContinent, onValueChangeContinent: handleContinentChange }}
          currencyProps={{ currencyOptions: prepareDeduplicatedData(countries, 'currency'), selectedCurrency: selectedCurrency, onValueChangeCurrency: handleCurrencyChange }}      
          languageProps={{ languageOptions: prepareDeduplicatedData(countries, 'languages'), selectedLanguage: selectedLanguage, onValueChangeLanguage: handleLanguageChange }}      
      />

      <div style={cards}>
        {countries
          ?.filter((country: Country) => country?.currency?.toLowerCase().includes(selectedCurrency?.toLowerCase()))
          ?.filter((country: Country) => country?.continent?.name?.toLowerCase().includes(selectedContinent?.toLowerCase()))
          ?.filter((country: Country) => country?.form_of_government?.toLowerCase().includes(selectedGovernmentForm?.toLowerCase()))
          ?.filter((country: Country) => country?.name?.toLowerCase().includes(searchTerm?.toLowerCase()))
          ?.map((country: Country) => (
            <CountryCard
              key={country?.name}
              country_data={country}
              country_count={countryCount}
            />
          ))}
      </div>
    </>
  );
}

export default CardArea;
