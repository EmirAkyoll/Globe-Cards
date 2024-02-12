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
      try {
        const country_data_part_2 = await fetch('http://localhost:5000/api/countries/get-all');
        if (!country_data_part_2.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CountryPart2[] = await country_data_part_2.json();
        const mergedArray = country_data_part_1?.countries.map((country: CountryPart1, index: number) => {
          // console.log("Index:", index);
          return {
            index,
            ...country,
            ...data[index]
          };
        });       
        console.log('mergedArray:', mergedArray);
        setCountries(mergedArray)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    
    console.log("countries: ", countries);
    console.log("RATATOR: ", country_data_part_1);
  }, [country_data_part_1]);

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
