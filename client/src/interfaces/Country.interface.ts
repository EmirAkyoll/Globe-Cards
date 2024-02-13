import { Continent, Language } from "./Country1.interface";
import { Background } from "./Country2.interface";

export interface Country {
    _id: string;
    name: string;
    capital: string;
    phone: number;
    code: string;
    native: string;
    currency: string;
    emoji: string;
    continent: Continent
    languages: Language[]
    country_name: string;
    flag_url: string;
    silhouette_url: string;
    area: number;
    population: number;
    currency_sign: string;
    gdp: number;
    form_of_government: string;
    background: Background
  }
  
  