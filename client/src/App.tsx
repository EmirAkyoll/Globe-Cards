import React, { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_COUNTRIES } from "./gql/queries";
import CountryCard from "./components/CountryCard/CountryCard";
import Navbar from "./components/Navbar/Navbar";
import { CountryPart2 } from "./interfaces/Country2.interface";
import { CountryPart1 } from "./interfaces/Country1.interface";

function App() {
  const { loading, error, data: country_data_part_1 } = useQuery(GET_ALL_COUNTRIES);
  const [countries, setCountries] = useState<any>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const allMergerCountry: any = [];
      try {
        const response = await fetch('http://localhost:5000/api/countries/get-all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data: ", data);

        country_data_part_1?.countries.map((country: any) => {
          const additionalData = data.find((data:any) => data.name === country.country_name);
          delete additionalData.country_name
          const merged = {...country, ...additionalData };
          allMergerCountry.push(merged)
          // console.log("country: ", merged);
        })
        console.log("allMergerCountry: ", allMergerCountry);
        
        setCountries(allMergerCountry)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();

    // const mergedCountriesData = country_data_part_1?.countries.map((country: any) => {
    //   const additionalData = countries.find((data:any) => data.name === country.country_name);
    //   delete additionalData.country_name
    //   const merged = {...country, ...additionalData };
    //   setCountries(merged)
    //   console.log("country: ", merged);
    //   return merged;
    // });
    
    console.log("countries: ", countries);
    // console.log("merged: ", allMergerCountry);
    console.log("RATATOR: ", country_data_part_1?.countries);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="cards">
        {countries?.map(
          (country: any) =>
            (<CountryCard key={country.name} country_data={country}/>)
        )}
      </div>
    </div>
  );
}

export default App;
